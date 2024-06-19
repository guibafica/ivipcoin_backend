export interface Tasks {
  id: string;
  body: string;
  color: string;
  status: number;
  // createdAt: FirebaseFirestore.Timestamp;
  // updatedAt: FirebaseFirestore.Timestamp;
  createdAt?: string;
  updatedAt?: string;
}
