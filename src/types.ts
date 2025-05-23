export interface User {
  user_id: string;
  name: string;
  email: string;
}

export interface Material {
  material_id: string;
  title: string;
  description?: string;
  subject: string;
  topic: string;
  author?: string;
  filename?: string;
  url_or_path?: string;
  date_added: string;
}
