"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveStringProperty = exports.DomainPrimitiveStringGenerator = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
const _ = require("lodash");
class DomainPrimitiveStringGenerator {
    constructor(textWriter, property, entityName, namespace) {
        this.textWriter = textWriter;
        this.property = property;
        this.entityName = entityName;
        this.namespace = namespace;
        this.generate = () => {
            const customWriter = new customCsharpWriter_1.CustomCsharpWriter(this.textWriter);
            customWriter.writeUsingDirectives('Wepsys.Core');
            customWriter.writeLine();
            customWriter.writeCsharpTenNamespace(this.namespace);
            customWriter.writeLine();
            const className = this.property.name;
            const classDefinitions = {
                name: className,
                inherits: ['AbstractStringPrimitive'],
                accessModifier: 'public',
            };
            customWriter.writeOneLineXmlDocSummary(`Represents ${this.entityName}'s ${className}`);
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
                const minLength = this.property.min ? this.property.min : 1;
                customWriter.writePublicFieldConst('MinLength', 'int', minLength.toString());
                customWriter.writeLine();
                customWriter.writeXmlDocParagraph([
                    'Represents the Description max length restriction.',
                ]);
                const maxLength = this.property.max ? this.property.max : 100;
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
                if (this.property.regex) {
                    customWriter.writePublicFieldConst('ValidPattern', 'string', `@"${this.property.regex}"`);
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
                customWriter.writeConstructor('private', className, parameters, getConstructorBaseImplementation(this.property));
                customWriter.writeCodeBlock(() => { });
            });
        };
        this.getConstructorBaseImplementation = (property) => {
            if (property.regex) {
                return `base(raw${property.name}, LengthRange, ValidPattern, ErrorMessage)`;
            }
            else {
                return `base(raw${property.name}, LengthRange, ErrorMessage)`;
            }
        };
    }
}
exports.DomainPrimitiveStringGenerator = DomainPrimitiveStringGenerator;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVTdHJpbmdQcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlRG9tYWluUHJpbWl0aXZlU3RyaW5nUHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNEVBQXlFO0FBR3pFLDRCQUE2QjtBQUU3QixNQUFhLDhCQUE4QjtJQUV6QyxZQUFvQixVQUFzQixFQUN0QixRQUFpQyxFQUNqQyxVQUFrQixFQUNsQixTQUFpQjtRQUhqQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUlyQyxhQUFRLEdBQUcsR0FBRyxFQUFFO1lBQ2QsTUFBTSxZQUFZLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFN0QsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUV6QixZQUFZLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN6QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUVyQyxNQUFNLGdCQUFnQixHQUFvQjtnQkFDeEMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsUUFBUSxFQUFFLENBQUMseUJBQXlCLENBQUM7Z0JBQ3JDLGNBQWMsRUFBRSxRQUFRO2FBQ3pCLENBQUM7WUFFRixZQUFZLENBQUMseUJBQXlCLENBQUMsY0FBYyxJQUFJLENBQUMsVUFBVSxNQUFNLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFDdkYsWUFBWSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtnQkFDekQsTUFBTSxp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