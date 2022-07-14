"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCsharpWriter = void 0;
const csharp_1 = require("@yellicode/csharp");
const _ = require("lodash");
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
    writeShortMethodInitializedWithParameter(method, isReadOnly = true) {
        const typeName = method.returnTypeName;
        const camelCasePropertyName = _.camelCase(typeName);
        let result = '';
        if (method.accessModifier) {
            result += method.accessModifier;
        }
        if (method.isStatic) {
            result += ' static';
        }
        if (isReadOnly) {
            result += ' readonly';
        }
        this.writeLine(`${result} ${typeName} ${method.name}(string ${camelCasePropertyName}) => new(${camelCasePropertyName});`);
    }
    writeShortMethodInitializedWithGivenValue(method, defaultValue, paramType, isReadOnly = true) {
        const typeName = method.returnTypeName;
        let result = '';
        if (method.accessModifier) {
            result += method.accessModifier;
        }
        if (method.isStatic) {
            result += ' static';
        }
        if (isReadOnly) {
            result += ' readonly';
        }
        this.writeLine(`${result} ${typeName} ${method.name}(${paramType} raw${typeName}) => new(${defaultValue});`);
    }
    writeShortMethodInitializedWithoutParameters(method, defaultValue, isReadOnly = true) {
        const typeName = method.returnTypeName;
        let result = '';
        if (method.accessModifier) {
            result += method.accessModifier;
        }
        if (method.isStatic) {
            result += ' static';
        }
        if (isReadOnly) {
            result += ' readonly';
        }
        this.writeLine(`${result} ${typeName} ${method.name}() => new(${defaultValue});`);
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
    writeOneLineXmlDocSummary(text) {
        this.writeLine(`///<summary>${text}</summary>`);
    }
}
exports.CustomCsharpWriter = CustomCsharpWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tQ3NoYXJwV3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tQ3NoYXJwV3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUkyQjtBQUUzQiw0QkFBNkI7QUFFN0IsTUFBYSxrQkFBbUIsU0FBUSxxQkFBWTtJQUMzQyxVQUFVLENBQUMsa0JBQXlDO1FBQ3pELE1BQU0sS0FBSyxHQUFHLENBQUMsa0JBQWtCLENBQUMsWUFBWTtZQUM1QyxDQUFDLENBQUMsR0FBRztZQUNMLENBQUMsQ0FBQyxLQUFLLGtCQUFrQixDQUFDLFlBQVksR0FBRyxDQUFDO1FBQzVDLE1BQU0sY0FBYyxHQUFHLGtCQUFrQixDQUFDLGNBQWMsQ0FBQztRQUN6RCxNQUFNLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFFeEUsTUFBTSxjQUFjLEdBQUcsR0FBRyxjQUFjLEdBQUcsZ0JBQWdCLFlBQVksa0JBQWtCLENBQUMsUUFBUSxJQUFJLGtCQUFrQixDQUFDLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUV6SSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTSx1QkFBdUIsQ0FBQyxTQUFpQjtRQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sd0NBQXdDLENBQUMsTUFBd0IsRUFBRSxhQUFzQixJQUFJO1FBRWxHLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDdkMsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixJQUFJLE1BQU0sQ0FBQyxjQUFjLEVBQUU7WUFDekIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUM7U0FDakM7UUFFRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDbkIsTUFBTSxJQUFJLFNBQVMsQ0FBQTtTQUNwQjtRQUVELElBQUksVUFBVSxFQUFFO1lBQ2QsTUFBTSxJQUFJLFdBQVcsQ0FBQTtTQUN0QjtRQUVELElBQUksQ0FBQyxTQUFTLENBQ1osR0FBRyxNQUFNLElBQUksUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLFdBQVcscUJBQXFCLFlBQVkscUJBQXFCLElBQUksQ0FDMUcsQ0FBQztJQUNKLENBQUM7SUFFTSx5Q0FBeUMsQ0FBQyxNQUF3QixFQUFFLFlBQW9CLEVBQUUsU0FBaUIsRUFBRSxhQUFzQixJQUFJO1FBQzVJLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFFdkMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLElBQUksTUFBTSxDQUFDLGNBQWMsRUFBRTtZQUN6QixNQUFNLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQztTQUNqQztRQUVELElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNuQixNQUFNLElBQUksU0FBUyxDQUFBO1NBQ3BCO1FBRUQsSUFBSSxVQUFVLEVBQUU7WUFDZCxNQUFNLElBQUksV0FBVyxDQUFBO1NBQ3RCO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FDWixHQUFHLE1BQU0sSUFBSSxRQUFRLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxTQUFTLE9BQU8sUUFBUSxZQUFZLFlBQVksSUFBSSxDQUM3RixDQUFDO0lBQ0osQ0FBQztJQUVNLDRDQUE0QyxDQUNqRCxNQUF3QixFQUN4QixZQUFvQixFQUNwQixhQUFzQixJQUFJO1FBRTFCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDdkMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLElBQUksTUFBTSxDQUFDLGNBQWMsRUFBRTtZQUN6QixNQUFNLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQztTQUNqQztRQUVELElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNuQixNQUFNLElBQUksU0FBUyxDQUFBO1NBQ3BCO1FBRUQsSUFBSSxVQUFVLEVBQUU7WUFDZCxNQUFNLElBQUksV0FBVyxDQUFBO1NBQ3RCO1FBR0QsSUFBSSxDQUFDLFNBQVMsQ0FDWixHQUFHLE1BQU0sSUFBSSxRQUFRLElBQUksTUFBTSxDQUFDLElBQUksYUFBYSxZQUFZLElBQUksQ0FDbEUsQ0FBQztJQUNKLENBQUM7SUFFTSxxQkFBcUIsQ0FDMUIsSUFBWSxFQUNaLFFBQWdCLEVBQ2hCLGVBQXVCLEdBQUc7UUFFMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsUUFBUSxJQUFJLElBQUksTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTSxnQkFBZ0IsQ0FDckIsY0FBOEIsRUFDOUIsSUFBWSxFQUNaLFVBQWlDLEVBQ2pDLDJCQUFtQyxTQUFTO1FBRTVDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVsRCxNQUFNLGtCQUFrQixHQUFHLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxLQUFLLHdCQUF3QixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMzRixNQUFNLE1BQU0sR0FBRyxHQUFHLGNBQWMsSUFBSSxJQUFJLElBQUksTUFBTSxLQUFLLGtCQUFrQixFQUFFLENBQUM7UUFDNUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU8sbUJBQW1CLENBQUMsVUFBaUM7UUFDM0QsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBR2hCLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3RELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVwQyxJQUFJLEtBQUssSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDckQ7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUM7YUFDdkQ7U0FDRjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxzQkFBc0IsQ0FBQyxlQUFnQyxFQUFFLFFBQXdDO1FBQ3RHLElBQUksZUFBZSxDQUFDLGFBQWEsSUFBSSxTQUFTLEVBQUU7WUFDOUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN4RDtRQUVELElBQUksV0FBVyxHQUFHLHVCQUF1QixlQUFlLENBQUMsSUFBSSxHQUFHLENBQUM7UUFFakUsSUFBSSxlQUFlLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBRTtZQUN6QyxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLGNBQWMsR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUM7WUFDdkgsV0FBVyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7U0FDaEM7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLHlCQUF5QixDQUFDLElBQVk7UUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLElBQUksWUFBWSxDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUVGO0FBbkpELGdEQW1KQyJ9