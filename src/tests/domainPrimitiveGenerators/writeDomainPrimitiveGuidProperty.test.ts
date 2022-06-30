import * as fs from 'fs';

describe('writeDomainPrimitiveGuidProperty.ts tests', () => {
  test('When a required guid domain primitive property is generated should generate property template correctly', (done) => {
    fs.readFile(__dirname + '/template-test-result/User/Id.cs', 'utf8', function (_errFirst, generatedFile) {
    
      fs.readFile(
        __dirname + '/template/IdGuidRequiredProperty.cs',
        'utf8',
        function (_err, template) {
          done();
          expect(generatedFile).toBeDefined();
          expect(template).toBeDefined();
          expect(generatedFile).toEqual(template);
          
        }
      );
    });
  });

});
