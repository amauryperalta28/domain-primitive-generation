import { DomainPrimitiveProperty } from './domain-primitive-property';

export interface Entity {
  name: string;
  namespace: string;
  properties: DomainPrimitiveProperty[];
}
