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
    writeShortMethodInitialized(method) {
        const typeName = method.returnTypeName;
        const lowerCasePropertyName = typeName.toLowerCase();
        this.writeLine(`public static readonly ${typeName} ${method.name}(string ${lowerCasePropertyName}) => new(${lowerCasePropertyName});`);
    }
    writeShortMethodInitializedWithoutParameters(method, defaultValue) {
        const typeName = method.returnTypeName;
        const lowerCasePropertyName = typeName.toLowerCase();
        this.writeLine(`public static readonly ${typeName} ${method.name}() => new(${defaultValue});`);
    }
    writePublicFieldConst(name, typeName, defaultValue = 0) {
        this.writeLine(`public const ${typeName} ${name} = ${defaultValue};`);
    }
    writePrivateConstructor(name, parameters, baseMethodImplementation) {
        let params = this.getStringParameters(parameters);
        const baseImplementation = baseMethodImplementation ? `: ${baseMethodImplementation}` : '';
        this.writeLine(`private ${name}(${params}) ${baseImplementation}`);
    }
    getStringParameters(parameters) {
        let params = '';
        for (let index = 0; index < parameters.length; index++) {
            const parameter = parameters[index];
            if (index == parameters.length - 1) {
                params = `${parameter.typeName} ${parameter.name}`;
            }
            else {
                params = `${parameter.typeName} ${parameter.name},`;
            }
        }
        return params;
    }
}
exports.CustomCsharpWriter = CustomCsharpWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tQ3NoYXJwV3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tQ3NoYXJwV3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUkyQjtBQUczQixNQUFhLGtCQUFtQixTQUFRLHFCQUFZO0lBQzNDLFVBQVUsQ0FBQyxrQkFBeUM7UUFDekQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZO1lBQzVDLENBQUMsQ0FBQyxHQUFHO1lBQ0wsQ0FBQyxDQUFDLEtBQUssa0JBQWtCLENBQUMsWUFBWSxHQUFHLENBQUM7UUFDNUMsTUFBTSxjQUFjLEdBQUcsa0JBQWtCLENBQUMsY0FBYyxDQUFDO1FBQ3pELE1BQU0sZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUV4RSxNQUFNLGNBQWMsR0FBRyxHQUFHLGNBQWMsR0FBRyxnQkFBZ0IsWUFBWSxrQkFBa0IsQ0FBQyxRQUFRLElBQUksa0JBQWtCLENBQUMsSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBRXpJLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLHVCQUF1QixDQUFDLFNBQWlCO1FBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSwyQkFBMkIsQ0FBQyxNQUF3QjtRQUN6RCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ3ZDLE1BQU0scUJBQXFCLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQ1osMEJBQTBCLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxXQUFXLHFCQUFxQixZQUFZLHFCQUFxQixJQUFJLENBQ3ZILENBQUM7SUFDSixDQUFDO0lBRU0sNENBQTRDLENBQ2pELE1BQXdCLEVBQ3hCLFlBQW9CO1FBRXBCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDdkMsTUFBTSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FDWiwwQkFBMEIsUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLGFBQWEsWUFBWSxJQUFJLENBQy9FLENBQUM7SUFDSixDQUFDO0lBRU0scUJBQXFCLENBQzFCLElBQVksRUFDWixRQUFnQixFQUNoQixlQUF1QixDQUFDO1FBRXhCLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLFFBQVEsSUFBSSxJQUFJLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU0sdUJBQXVCLENBQzVCLElBQVksRUFDWixVQUFpQyxFQUNqQyx3QkFBZ0M7UUFFaEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWxELE1BQU0sa0JBQWtCLEdBQUcsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLEtBQUssd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRTNGLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxJQUFJLElBQUksTUFBTSxLQUFLLGtCQUFrQixFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRU8sbUJBQW1CLENBQUMsVUFBaUM7UUFDM0QsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBR2hCLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3RELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVwQyxJQUFJLEtBQUssSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDcEQ7aUJBQU07Z0JBQ0wsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUM7YUFDckQ7U0FDRjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQXhFRCxnREF3RUMifQ==