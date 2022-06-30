import * as fs from 'fs';

describe('writeDomainPrimitiveGuidProperty.ts tests', () => {
  test('When a required guid domain primitive property is generated should generate property template correctly', (done) => {
   const generatedTemplateFilePath  = __dirname + '/template-test-result/User/Id.cs';
   const expectedTemplateFilePath =  __dirname + '/template/IdGuidRequiredProperty.cs'

    compareGeneratedTemplateWithExpectedTemplate(generatedTemplateFilePath, expectedTemplateFilePath, done);
  });

});

const compareGeneratedTemplateWithExpectedTemplate = (generatedFilePath: string, templatePath: string, done: Function)=>{
  fs.readFile(generatedFilePath, 'utf8', function (_errFirst, generatedFile) {
    
    fs.readFile(
      templatePath,
      'utf8',
      function (_err, template) {
        done();
        expect(generatedFile).toBeDefined();
        expect(template).toBeDefined();
        expect(generatedFile).toEqual(template);
        
      }
    );
  });
}
