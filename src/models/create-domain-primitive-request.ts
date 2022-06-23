import { DomainPrimitiveProperty } from './domain-primitive-property';

export interface CreateDomainPrimitivesRequest {
  name: string;
  properties: DomainPrimitiveProperty[];
}
