"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveStringProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveStringProperty = (textWriter, property, entityName, namespace) => {
    const customWriter = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
    customWriter.writeUsingDirectives('Wepsys.Core');
    customWriter.writeLine();
    customWriter.writeCsharpTenNamespace(namespace);
    customWriter.writeLine();
    const className = property.name;
    const classDefinitions = {
        name: className,
        inherits: ['AbstractStringPrimitive'],
        accessModifier: 'public',
        xmlDocSummary: [`Represents an ${entityName}'s ${className}`],
    };
    customWriter.writePublicSealedClass(classDefinitions, (c) => {
        const errorMessageField = {
            name: 'ErrorMessage',
            isStatic: true,
            typeName: 'Message',
            defaultValue: `new("Invalid value or format for ${className}")`,
            accessModifier: 'private',
        };
        customWriter.writeXmlDocParagraph([
            'Represents the Description minimum length restriction.',
        ]);
        const minLength = property.min ? property.min : 1;
        customWriter.writePublicFieldConst('MinLength', 'int', minLength.toString());
        customWriter.writeLine();
        customWriter.writeXmlDocParagraph([
            'Represents the Description max length restriction.',
        ]);
        const maxLength = property.max ? property.max : 100;
        customWriter.writePublicFieldConst('MaxLength', 'int', maxLength.toString());
        customWriter.writeLine();
        customWriter.writeField(errorMessageField);
        const StringLengthRangeField = {
            name: 'StringLengthRange',
            isStatic: true,
            typeName: 'LengthRange',
            defaultValue: `(MinLength, MaxLength).ToLengthRange()`,
            accessModifier: 'private',
        };
        customWriter.writeField(StringLengthRangeField);
        customWriter.writeLine();
        if (property.regex) {
            customWriter.writePublicFieldConst('ValidPattern', 'string', `@"${property.regex}"`);
            customWriter.writeLine();
        }
        customWriter.writeXmlDocSummary([
            `Shortcut for constructor <see cref="${className}"/>.`,
            `<param name="${className.toLowerCase()}">Represents a ${className.toLowerCase()}.</param>`,
            `<returns>An instance of <see cref="${className}"/></returns>`,
        ]);
        customWriter.writeShortMethodInitializedWithParameter({
            name: 'From',
            returnTypeName: className,
        });
        const parameters = [
            { typeName: 'string', name: `raw${className}` },
        ];
        customWriter.writeConstructor('private', className, parameters, getConstructorBaseImplementation(property));
        customWriter.writeCodeBlock(() => { });
    });
};
const getConstructorBaseImplementation = (property) => {
    if (property.regex) {
        return `base(raw${property.name}, LengthRange, ValidPattern, ErrorMessage)`;
    }
    else {
        return `base(raw${property.name}, LengthRange, ErrorMessage)`;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVTdHJpbmdQcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlRG9tYWluUHJpbWl0aXZlU3RyaW5nUHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNEVBQXlFO0FBSTVELFFBQUEsa0NBQWtDLEdBQUcsQ0FDaEQsVUFBc0IsRUFDdEIsUUFBaUMsRUFDakMsVUFBa0IsRUFDbEIsU0FBaUIsRUFDakIsRUFBRTtJQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksdUNBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEQsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV6QixZQUFZLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3pCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFFaEMsTUFBTSxnQkFBZ0IsR0FBb0I7UUFDeEMsSUFBSSxFQUFFLFNBQVM7UUFDZixRQUFRLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztRQUNyQyxjQUFjLEVBQUUsUUFBUTtRQUN4QixhQUFhLEVBQUUsQ0FBQyxpQkFBaUIsVUFBVSxNQUFNLFNBQVMsRUFBRSxDQUFDO0tBQzlELENBQUM7SUFDRixZQUFZLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUMxRCxNQUFNLGlCQUFpQixHQUEwQjtZQUMvQyxJQUFJLEVBQUUsY0FBYztZQUNwQixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFlBQVksRUFBRSxvQ0FBb0MsU0FBUyxJQUFJO1lBQy9ELGNBQWMsRUFBRSxTQUFTO1NBQzFCLENBQUM7UUFFRixZQUFZLENBQUMsb0JBQW9CLENBQUM7WUFDaEMsd0RBQXdE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