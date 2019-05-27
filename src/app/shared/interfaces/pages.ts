export interface Pages {
  group: string;
  itens: Array<{
    title: string;
    url: any;
    direct?: string;
    icon?: string;
  }>;
}
