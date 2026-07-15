// src/types/index.ts
// ─── Admin ───────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  created_at: string;
}

export interface AdminLoginAttempt {
  id: string;
  attempted_at: string;
  ip_address: string;
  locked_until: string | null;
  created_at: string;
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// ─── Blog ────────────────────────────────────────────────────────────────────

export type BlogPostStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: Record<string, unknown>; // Tiptap JSON
  cover_image_url: string | null;
  status: BlogPostStatus;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

// Blog post as it appears in listing pages — no full content needed
export type BlogPostSummary = Omit<BlogPost, "content">;

// ─── API Responses ───────────────────────────────────────────────────────────

export interface ApiSuccess<T = void> {
  success: true;
  data?: T;
}

export interface ApiError {
  success: false;
  error: string;
}

export type ApiResponse<T = void> = ApiSuccess<T> | ApiError;
