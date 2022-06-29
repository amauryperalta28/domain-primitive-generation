import { DomainPrimitiveProperty } from './domain-primitive-property';

export interface CreateDomainPrimitivesRequest {
  entities: Entity[];
}

export interface Entity {
  name: string;
  namespace: string;
  properties: DomainPrimitiveProperty[];
}
