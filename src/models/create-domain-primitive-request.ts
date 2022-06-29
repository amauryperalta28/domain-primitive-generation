import { DomainPrimitiveProperty } from './domain-primitive-property';

export interface CreateDomainPrimitivesRequest {
  entities: Entity[];
}

export interface Entity {
  entityName: string;
  namespace: string;
  properties: DomainPrimitiveProperty[];
}
