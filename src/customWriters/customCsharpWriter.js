"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCsharpWriter = void 0;
const csharp_1 = require("@yellicode/csharp");
var _ = require('lodash');
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
        const camelCasePropertyName = _.camelCase(typeName);
        this.writeLine(`public static readonly ${typeName} ${method.name}(string ${camelCasePropertyName}) => new(${camelCasePropertyName});`);
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
    writePublicFieldConst(name, typeName, defaultValue = '0') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tQ3NoYXJwV3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tQ3NoYXJwV3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUkyQjtBQUkzQixJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFMUIsTUFBYSxrQkFBbUIsU0FBUSxxQkFBWTtJQUMzQyxVQUFVLENBQUMsa0JBQXlDO1FBQ3pELE1BQU0sS0FBSyxHQUFHLENBQUMsa0JBQWtCLENBQUMsWUFBWTtZQUM1QyxDQUFDLENBQUMsR0FBRztZQUNMLENBQUMsQ0FBQyxLQUFLLGtCQUFrQixDQUFDLFlBQVksR0FBRyxDQUFDO1FBQzVDLE1BQU0sY0FBYyxHQUFHLGtCQUFrQixDQUFDLGNBQWMsQ0FBQztRQUN6RCxNQUFNLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFFeEUsTUFBTSxjQUFjLEdBQUcsR0FBRyxjQUFjLEdBQUcsZ0JBQWdCLFlBQVksa0JBQWtCLENBQUMsUUFBUSxJQUFJLGtCQUFrQixDQUFDLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUV6SSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTSx1QkFBdUIsQ0FBQyxTQUFpQjtRQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sd0NBQXdDLENBQUMsTUFBd0I7UUFFdEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUN2QyxNQUFNLHFCQUFxQixHQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FDWiwwQkFBMEIsUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLFdBQVcs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