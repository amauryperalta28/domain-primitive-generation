import { DomainPrimitiveProperty } from './domain-primitive-property';

export interface CreateDomainPrimitivesRequest {
  entityName: string;
  namespace: string;
  properties: DomainPrimitiveProperty[];
}
