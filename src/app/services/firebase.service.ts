import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs: AngularFirestore) { }

  getDocuments(collectionName: string) {
    return this.afs.collection(collectionName).snapshotChanges()
  }

  getSingleDocument(collectionName: string, documentId: string) {
    return this.afs.collection(collectionName).doc(documentId).snapshotChanges()
  }

  createDocument(collectionName: string, documentData: any) {
    return this.afs.collection(collectionName).add(documentData)
  }

  setDocument(collectionName: string, documentId: string, documentData: any) {
    return this.afs.collection(collectionName).doc(documentId).set(documentData)
  }
  updateDocument(collectionName: string, documentId: string, newDocumentData: any) {
    return this.afs.collection(collectionName).doc(documentId).set(newDocumentData)
  }

  deleteDocument(collectionName: string, documentId: string) {
    return this.afs.collection(collectionName).doc(documentId).delete()
  }
}
