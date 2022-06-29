"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCsharpWriter = void 0;
const csharp_1 = require("@yellicode/csharp");
class CustomCsharpWriter extends csharp_1.CSharpWriter {
    writeField(propertyDefinition) {
        const value = !propertyDefinition.defaultValue
            ? ';'
            : `= ${propertyDefinition.defaultValue};`;
        const accessModifier = propertyDefinition.accessModifier;
        const staticIdentifier = propertyDefinition.isStatic ? ' static ' : ' ';
        const propertyResult = `${accessModifier}${staticIdentifier}readonly ${propertyDefinition.typeName} ${propertyDefinition.name} ${value}`;
        this.writeLine(propertyResult);
    }
    writeCsharpTenNamespace(namespace) {
        this.writeLine(`namespace ${namespace};`);
    }
    writeShortMethodInitializedWithParameter(method) {
        const typeName = method.returnTypeName;
        const lowerCasePropertyName = typeName.toLowerCase();
        this.writeLine(`public static readonly ${typeName} ${method.name}(string ${lowerCasePropertyName}) => new(${lowerCasePropertyName});`);
    }
    writeShortMethodInitializedWithGivenValue(method, defaultValue, paramType) {
        const typeName = method.returnTypeName;
        const lowerCasePropertyName = typeName.toLowerCase();
        this.writeLine(`public static readonly ${typeName} ${method.name}(${paramType} raw${typeName}) => new(${defaultValue});`);
    }
    writeShortMethodInitializedWithoutParameters(method, defaultValue) {
        const typeName = method.returnTypeName;
        this.writeLine(`public static readonly ${typeName} ${method.name}() => new(${defaultValue});`);
    }
    writePublicFieldConst(name, typeName, defaultValue = 0) {
        this.writeLine(`public const ${typeName} ${name} = ${defaultValue};`);
    }
    writeConstructor(accessModifier, name, parameters, baseMethodImplementation = undefined) {
        let params = this.getStringParameters(parameters);
        const baseImplementation = baseMethodImplementation ? `: ${baseMethodImplementation}` : '';
        const result = `${accessModifier} ${name}(${params}) ${baseImplementation}`;
        this.writeLine(result.trim());
    }
    getStringParameters(parameters) {
        let params = '';
        for (let index = 0; index < parameters.length; index++) {
            const parameter = parameters[index];
            if (index == parameters.length - 1) {
                params += `${parameter.typeName} ${parameter.name}`;
            }
            else {
                params += `${parameter.typeName} ${parameter.name}, `;
            }
        }
        return params;
    }
    writePublicSealedClass(classDefinition, contents) {
        if (classDefinition.xmlDocSummary != undefined) {
            this.writeXmlDocSummary(classDefinition.xmlDocSummary);
        }
        let classHeader = `public sealed class ${classDefinition.name} `;
        if (classDefinition.inherits != undefined) {
            const inherits = classDefinition.inherits.reduce((currentInherit, nextInherit) => currentInherit + ', ' + nextInherit);
            classHeader += `: ${inherits}`;
        }
        this.writeLine(classHeader);
        this.writeCodeBlock(contents);
    }
}
exports.CustomCsharpWriter = CustomCsharpWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tQ3NoYXJwV3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tQ3NoYXJwV3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUkyQjtBQUkzQixNQUFhLGtCQUFtQixTQUFRLHFCQUFZO0lBQzNDLFVBQVUsQ0FBQyxrQkFBeUM7UUFDekQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZO1lBQzVDLENBQUMsQ0FBQyxHQUFHO1lBQ0wsQ0FBQyxDQUFDLEtBQUssa0JBQWtCLENBQUMsWUFBWSxHQUFHLENBQUM7UUFDNUMsTUFBTSxjQUFjLEdBQUcsa0JBQWtCLENBQUMsY0FBYyxDQUFDO1FBQ3pELE1BQU0sZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUV4RSxNQUFNLGNBQWMsR0FBRyxHQUFHLGNBQWMsR0FBRyxnQkFBZ0IsWUFBWSxrQkFBa0IsQ0FBQyxRQUFRLElBQUksa0JBQWtCLENBQUMsSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBRXpJLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLHVCQUF1QixDQUFDLFNBQWlCO1FBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSx3Q0FBd0MsQ0FBQyxNQUF3QjtRQUN0RSxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ3ZDLE1BQU0scUJBQXFCLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQ1osMEJBQTBCLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxXQUFXLHFCQUFxQixZQUFZLHFCQUFxQixJQUFJLENBQ3ZILENBQUM7SUFDSixDQUFDO0lBRU0seUNBQXlD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