import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import { writeDomainPrimitiveStringProperty } from './src/domainPrimitiveGenerators';
import { writeDomainPrimitiveGuidProperty } from './src/domainPrimitiveGenerators/writeDomainPrimitiveGuidProperty';
import { validateRequest } from './src/helpers/validate-request';
import { CustomFieldDefinition } from './src/models/customPropertyDefinition';
import { ClassDefinition, ParameterDefinition, PropertyFeatures } from '@yellicode/csharp';
import { CustomCsharpWriter } from './src/customWriters/customCsharpWriter';
import {
  CreateDomainPrimitivesRequest,
  DomainPrimitiveProperty,
} from './src/models';

const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };

Generator.generateFromModel(
  options,
  (textWriter: TextWriter, model: CreateDomainPrimitivesRequest) => {
    const validationResult = validateRequest(model);

    if (!validationResult.success) {
      throw new Error(validationResult.message);
    }

    writeDomainPrimitiveEntity(
      textWriter,
      model.entityName,
      model.folderName,
      model.properties
    );

    const stringProperties: DomainPrimitiveProperty[] = model.properties.filter(
      (property) => property.type === 'string'
    );

    const guidProperties: DomainPrimitiveProperty[] = model.properties.filter(
      (property) => property.type === 'Guid'
    );

    stringProperties.forEach((property: DomainPrimitiveProperty) => {
      const className = property.name;

      Generator.generate(
        { outputFile: `./result/${className}.cs` },
        (writer: TextWriter) => {
          writeDomainPrimitiveStringProperty(
            writer,
            className,
            'User',
            'Users'
          );
        }
      );
    });

    guidProperties.forEach((property: DomainPrimitiveProperty) => {
      const className = property.name;

      Generator.generate(
        { outputFile: `./result/${className}.cs` },
        (writer: TextWriter) => {
          writeDomainPrimitiveGuidProperty(writer, 'Id', 'User', 'Users');
        }
      );
    });
  }
);

const writeDomainPrimitiveEntity = (
  textWriter: TextWriter,
  className: string,
  folderName: string,
  properties: DomainPrimitiveProperty[]
) => {
  const customWriter = new CustomCsharpWriter(textWriter);

  customWriter.writeCsharpTenNamespace(`Ri.Novus.Core.${folderName}`);
  customWriter.writeLine(); // insert a blank line

  const classDefinitions: ClassDefinition = {
    name: className,
    accessModifier: 'public',
    xmlDocSummary: [`Represents ${className} entity.`],
  };
  customWriter.writeClassBlock(classDefinitions, (c) => {
    properties.forEach((property) => {
      customWriter.writeAutoProperty({
        name: property.name,
        typeName: property.name,
        noGetter: false,
        noSetter: true,
        accessModifier: 'public',
        xmlDocSummary: [`Represents ${className}'s ${property.name}`],
      });
      customWriter.writeLine();
    });

    const parameters: ParameterDefinition[] = [
      { typeName: 'Builder', name: 'builder' },
    ];
    customWriter.writePrivateConstructor(className, parameters, null);
    customWriter.writeCodeBlock(()=>{
      customWriter.writeLine('Arguments.NotNull(builder, nameof(builder));');

      properties.forEach((property)=>{
            customWriter.writeLine(`${property.name} = builder.${property.name}Option.ValueOrFailure();`);
      })
    });
    customWriter.writeLine();

    writeEntityBuilder(className, customWriter, properties);


    //TODO: Agregar inicializacion de campos desde el builder
  });

};

const writeEntityBuilder = (className: string, customWriter: CustomCsharpWriter,
  properties: DomainPrimitiveProperty[])=>{
  const classDefinitions: ClassDefinition = {
    name: 'Builder',
    accessModifier: 'public',
    inherits:['AbstractEntityBuilder<Domain>'],
    xmlDocSummary: [`${className}'s builder.`],
  };
  customWriter.writeClassBlock(classDefinitions, (c) => {
    
    customWriter.writeLine('protected override Option<string> AlreadyBuiltErrorMessage => Option.None<string>();');
    customWriter.writeLine('protected override Option<string> MustBeBuiltErrorMessage => Option.None<string>();');

    properties.forEach((property)=>{
      customWriter.writeLine(`internal Option<${property.name}> ${property.name}Option { get; private set; }`);
      customWriter.writeLine();

    });

    customWriter.writeLine('private new Builder SetProperty(Action setter) => (Builder)base.SetProperty(setter);');
    customWriter.writeLine();

    writeDoBuild(className, customWriter, properties);

    properties.forEach((property)=>{
      writeWithMethod(property.name, customWriter);
    });

    //TODO: Agregar inicializacion de campos desde el builder
  });
}

const writeWithMethod = (className: string, customWriter: CustomCsharpWriter)=>{
   const propertyName = className.toLowerCase();
   customWriter.writeLine(`public Builder With${className}(${className} ${propertyName})`);
   customWriter.writeLine(`    => SetProperty(() => ${className}Option = Arguments.NotNull(${propertyName}, nameof(${propertyName}).SomeNotNull()));`);
}

const writeDoBuild = (className: string, customWriter: CustomCsharpWriter, properties: DomainPrimitiveProperty[])=>{
   customWriter.writeLine(`protected override ${className} DoBuild()`);
   customWriter.writeCodeBlock(()=>{
    properties.forEach((property)=>{
      customWriter.writeLine(`State.IsTrue(${property.name.toLowerCase()}Option.HasValue, "${className}'s ${property.name} is missing");`)
      
    })
   });

   customWriter.writeLine();
}

//TODO: ver como usar nodemon para compilar cambios inmediatamente
