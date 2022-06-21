"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWriter = void 0;
const core_1 = require("@yellicode/core");
class CustomWriter extends core_1.CodeWriter {
    writeStaticReadonlyProperty(typeName, propertyName, initialValue) {
        this.writeLine(`private static readonly ${typeName} ${propertyName} = ${initialValue};`);
    }
    writePublicStaticMethodReturningProperty(typeName) {
        const lowerCasePropertyName = typeName.toLowerCase();
        this.writeLine(`public static readonly ${typeName} From(string ${lowerCasePropertyName}) => new(${lowerCasePropertyName});`);
    }
}
exports.CustomWriter = CustomWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tV3JpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjdXN0b21Xcml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQ0FBNkM7QUFFN0MsTUFBYSxZQUFhLFNBQVEsaUJBQVU7SUFFakMsMkJBQTJCLENBQUUsUUFBZ0IsRUFBRSxZQUFvQixFQUFFLFlBQW9CO1FBQzVGLElBQUksQ0FBQyxTQUFTLENBQUMsMkJBQTJCLFFBQVEsSUFBSSxZQUFZLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBRU0sd0NBQXdDLENBQUMsUUFBZ0I7UUFDNUQsTUFBTSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQkFBMEIsUUFBUSxnQkFBZ0IscUJBQXFCLFlBQVkscUJBQXFCLElBQUksQ0FBQyxDQUFDO0lBQ2pJLENBQUM7Q0FNSjtBQWZELG9DQWVDIn0=