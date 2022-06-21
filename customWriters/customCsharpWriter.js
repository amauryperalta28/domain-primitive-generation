"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCsharpWriter = void 0;
const core_1 = require("@yellicode/core");
class CustomCsharpWriter extends core_1.CodeWriter {
    writeStaticReadonlyProperty(typeName, propertyName, initialValue = '') {
        const value = initialValue.length === 0 ? ';' : `= ${initialValue};`;
        const propertyResult = `private static readonly ${typeName} ${propertyName} ${value}`;
        this.writeLine(propertyResult);
    }
}
exports.CustomCsharpWriter = CustomCsharpWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tQ3NoYXJwV3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tQ3NoYXJwV3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBDQUE2QztBQUU3QyxNQUFhLGtCQUFtQixTQUFRLGlCQUFVO0lBQ3pDLDJCQUEyQixDQUNoQyxRQUFnQixFQUNoQixZQUFvQixFQUNwQixlQUF1QixFQUFFO1FBRXpCLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssWUFBWSxHQUFHLENBQUM7UUFFckUsTUFBTSxjQUFjLEdBQUcsMkJBQTJCLFFBQVEsSUFBSSxZQUFZLElBQUksS0FBSyxFQUFFLENBQUM7UUFFdEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqQyxDQUFDO0NBQ0Y7QUFaRCxnREFZQyJ9