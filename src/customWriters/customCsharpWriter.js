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
    writeShortMethodInitializedWithGivenValue(method, defaultValue) {
        const typeName = method.returnTypeName;
        const lowerCasePropertyName = typeName.toLowerCase();
        this.writeLine(`public static readonly ${typeName} ${method.name}(string ${lowerCasePropertyName}) => new(${defaultValue});`);
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
    writeSealedClass(classDefinition, contents) {
        if (classDefinition.xmlDocSummary != undefined) {
            this.writeXmlDocSummary(classDefinition.xmlDocSummary);
        }
        this.writeLine(`public sealed class ${classDefinition.name} `);
        if (classDefinition.inherits != undefined) {
            const inherits = classDefinition.inherits.reduce((x, y) => x + ',' + y);
            this.writeLine(`: ${inherits}`);
        }
        this.writeCodeBlock(contents);
    }
}
exports.CustomCsharpWriter = CustomCsharpWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tQ3NoYXJwV3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tQ3NoYXJwV3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUkyQjtBQUkzQixNQUFhLGtCQUFtQixTQUFRLHFCQUFZO0lBQzNDLFVBQVUsQ0FBQyxrQkFBeUM7UUFDekQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZO1lBQzVDLENBQUMsQ0FBQyxHQUFHO1lBQ0wsQ0FBQyxDQUFDLEtBQUssa0JBQWtCLENBQUMsWUFBWSxHQUFHLENBQUM7UUFDNUMsTUFBTSxjQUFjLEdBQUcsa0JBQWtCLENBQUMsY0FBYyxDQUFDO1FBQ3pELE1BQU0sZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUV4RSxNQUFNLGNBQWMsR0FBRyxHQUFHLGNBQWMsR0FBRyxnQkFBZ0IsWUFBWSxrQkFBa0IsQ0FBQyxRQUFRLElBQUksa0JBQWtCLENBQUMsSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBRXpJLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLHVCQUF1QixDQUFDLFNBQWlCO1FBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSx3Q0FBd0MsQ0FBQyxNQUF3QjtRQUN0RSxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ3ZDLE1BQU0scUJBQXFCLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQ1osMEJBQTBCLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxXQUFXLHFCQUFxQixZQUFZLHFCQUFxQixJQUFJLENBQ3ZILENBQUM7SUFDSixDQUFDO0lBRU0seUNBQXlD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