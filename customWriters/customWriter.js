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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tV3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tV3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBDQUE2QztBQUU3QyxNQUFhLFlBQWEsU0FBUSxpQkFBVTtJQUVqQywyQkFBMkIsQ0FBRSxRQUFnQixFQUFFLFlBQW9CLEVBQUUsWUFBb0I7UUFDNUYsSUFBSSxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsUUFBUSxJQUFJLFlBQVksTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFTSx3Q0FBd0MsQ0FBQyxRQUFnQjtRQUM1RCxNQUFNLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLDBCQUEwQixRQUFRLGdCQUFnQixxQkFBcUIsWUFBWSxxQkFBcUIsSUFBSSxDQUFDLENBQUM7SUFDakksQ0FBQztDQU1KO0FBZkQsb0NBZUMifQ==