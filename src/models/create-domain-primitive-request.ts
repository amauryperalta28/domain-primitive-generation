import { DomainPrimitiveProperty } from './domain-primitive-property';

export interface CreateDomainPrimitivesRequest {
  entityName: string;
  folderName: string;
  properties: DomainPrimitiveProperty[];
}
