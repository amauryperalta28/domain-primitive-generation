"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveStringProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
const _ = require("lodash");
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
    customWriter.writePublicSealedClass(classDefinitions, () => {
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
            const validPatternField = {
                name: 'ValidPattern',
                isStatic: false,
                typeName: 'string',
                defaultValue: `@"${property.regex}"`,
                accessModifier: 'private',
            };
            customWriter.writeField(validPatternField);
            customWriter.writeLine();
        }
        customWriter.writeXmlDocSummary([
            `Shortcut for constructor <see cref="${className}"/>.`,
            `<param name="${_.camelCase(className)}">Represents a ${_.camelCase(className)}.</param>`,
            `<returns>An instance of <see cref="${className}"/></returns>`,
        ]);
        const isReadOnly = false;
        customWriter.writeShortMethodInitializedWithParameter({
            name: 'From',
            returnTypeName: className,
            accessModifier: 'public',
            isStatic: true
        }, isReadOnly);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVTdHJpbmdQcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlRG9tYWluUHJpbWl0aXZlU3RyaW5nUHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNEVBQXlFO0FBR3pFLDRCQUE2QjtBQUVoQixRQUFBLGtDQUFrQyxHQUFHLENBQ2hELFVBQXNCLEVBQ3RCLFFBQWlDLEVBQ2pDLFVBQWtCLEVBQ2xCLFNBQWlCLEVBQ2pCLEVBQUU7SUFDRixNQUFNLFlBQVksR0FBRyxJQUFJLHVDQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhELFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFekIsWUFBWSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN6QixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBRWhDLE1BQU0sZ0JBQWdCLEdBQW9CO1FBQ3hDLElBQUksRUFBRSxTQUFTO1FBQ2YsUUFBUSxFQUFFLENBQUMseUJBQXlCLENBQUM7UUFDckMsY0FBYyxFQUFFLFFBQVE7S0FDekIsQ0FBQztJQUVGLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxjQUFjLFVBQVUsTUFBTSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ2xGLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7UUFDekQsTUFBTSxpQkFBaUIsR0FBMEI7WUFDL0MsSUFBSSxFQUFFLGNBQWM7WUFDcEIsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsU0FBUztZQUNuQixZQUFZLEVBQUUsb0NBQW9DLFNBQVMsSUFBSTtZQUMvRCxjQUFjLEVBQUUsU0FBUztTQUMxQixDQUFDO1FBRUYsWUFBWSxDQUFDLG9CQUFvQixDQUFD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