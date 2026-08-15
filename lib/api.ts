import type { Note, NoteTag } from '../types/note';

import axios from 'axios';

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesParams {
  page: number;
  search?: string;
  perPage: number;
  tag?: string;
  sortBy?: 'created' | 'updated';
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

export async function fetchNotes({
  page,
  search,
  perPage,
  tag,
  sortBy,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      search,
      perPage,
      tag,
      sortBy,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
}

// Cоздание заметки
export async function createNote(noteData: CreateNoteData): Promise<Note> {
  const response = await api.post<Note>('/notes', noteData, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
}

// Удаление заметки по ІД

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string) {
  console.log('fetchNoteById ID:', id);
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  console.log('NOTE RESPONSE:', res.data);
  return res.data;
}
