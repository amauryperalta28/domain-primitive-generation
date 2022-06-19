"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
exports.validateRequest = (request) => {
    if (request.properties.length === 0) {
        return { success: false, message: 'Domain primitive properties cant be null or empty' };
    }
    return { success: true, message: '' };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRlLXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR2EsUUFBQSxlQUFlLEdBQUksQ0FBQyxPQUFzQyxFQUFvQixFQUFFO0lBQ3pGLElBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFDO1FBQ2hDLE9BQU8sRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxtREFBbUQsRUFBcUIsQ0FBQztLQUM1RztJQUVELE9BQU8sRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQXFCLENBQUM7QUFDNUQsQ0FBQyxDQUFDIn0=