import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import { writeDomainPrimitiveStringProperty } from './src/domainPrimitiveGenerators';
import { validateRequest } from './src/helpers/validate-request';
import {
  CreateDomainPrimitivesRequest,
  DomainPrimitiveProperty
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

    const stringProperties: DomainPrimitiveProperty[] = model.properties.filter(
      (property) => property.type === 'string'
    );

    stringProperties.forEach((property, index) => {
      const className = property.name;

      Generator.generate(
        { outputFile: `./result/${className}.cs` },
        (writer: TextWriter) => {
          writer.writeLine(
            `/* This file contains the code for class '${className}'. */`
          );
          writeDomainPrimitiveStringProperty(writer, className, 'User', 'Users');
        }
      );
    });
  }
);

const writeDomainPrimitiveEntity = ()=>{
  //TODO: implementar
}

//TODO: ver como usar nodemon para compilar cambios inmediatamente
