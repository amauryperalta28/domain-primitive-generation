"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveStringProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
var _ = require('lodash');
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
    };
    customWriter.writeOneLineXmlDocSummary(`Represents ${entityName}'s ${className}`);
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
            name: 'LengthRange',
            isStatic: true,
            typeName: 'StringLengthRange',
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
            `<param name="${_.camelCase(className)}">Represents a ${_.camelCase(className)}.</param>`,
            `<returns>An instance of <see cref="${className}"/></returns>`,
        ]);
        customWriter.writeShortMethodInitializedWithParameter({
            name: 'From',
            returnTypeName: className,
            accessModifier: 'public',
            isStatic: true
        }, false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVTdHJpbmdQcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlRG9tYWluUHJpbWl0aXZlU3RyaW5nUHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNEVBQXlFO0FBR3pFLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUViLFFBQUEsa0NBQWtDLEdBQUcsQ0FDaEQsVUFBc0IsRUFDdEIsUUFBaUMsRUFDakMsVUFBa0IsRUFDbEIsU0FBaUIsRUFDakIsRUFBRTtJQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksdUNBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEQsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV6QixZQUFZLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3pCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFFaEMsTUFBTSxnQkFBZ0IsR0FBb0I7UUFDeEMsSUFBSSxFQUFFLFNBQVM7UUFDZixRQUFRLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztRQUNyQyxjQUFjLEVBQUUsUUFBUTtLQUN6QixDQUFDO0lBRUYsWUFBWSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsVUFBVSxNQUFNLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDbEYsWUFBWSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDMUQsTUFBTSxpQkFBaUIsR0FBMEI7WUFDL0MsSUFBSSxFQUFFLGNBQWM7WUFDcEIsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsU0FBUztZQUNuQixZQUFZLEVBQUUsb0NBQW9DLFNBQVMsSUFBSTtZQUMvRCxjQUFjLEVBQUUs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