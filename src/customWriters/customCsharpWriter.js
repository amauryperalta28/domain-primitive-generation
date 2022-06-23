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
}
exports.CustomCsharpWriter = CustomCsharpWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tQ3NoYXJwV3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tQ3NoYXJwV3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUFtRTtBQUduRSxNQUFhLGtCQUFtQixTQUFRLHFCQUFZO0lBQzNDLFVBQVUsQ0FBQyxrQkFBeUM7UUFDekQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZO1lBQzVDLENBQUMsQ0FBQyxHQUFHO1lBQ0wsQ0FBQyxDQUFDLEtBQUssa0JBQWtCLENBQUMsWUFBWSxHQUFHLENBQUM7UUFDNUMsTUFBTSxjQUFjLEdBQUcsa0JBQWtCLENBQUMsY0FBYyxDQUFDO1FBQ3pELE1BQU0sZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUV4RSxNQUFNLGNBQWMsR0FBRyxHQUFHLGNBQWMsR0FBRyxnQkFBZ0IsWUFBWSxrQkFBa0IsQ0FBQyxRQUFRLElBQUksa0JBQWtCLENBQUMsSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBRXpJLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLHVCQUF1QixDQUFDLFNBQWlCO1FBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSwyQkFBMkIsQ0FBQyxNQUF3QjtRQUN6RCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ3ZDLE1BQU0scUJBQXFCLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQ1osMEJBQTBCLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxXQUFXLHFCQUFxQixZQUFZLHFCQUFxQixJQUFJLENBQ3ZILENBQUM7SUFDSixDQUFDO0NBQ0Y7QUF4QkQsZ0RBd0JDIn0=