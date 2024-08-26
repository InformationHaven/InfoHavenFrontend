// src/app/services/firebase.service.ts
import { Injectable } from '@angular/core';
import { getDatabase, ref, get, child } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db;

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.db = getDatabase(app);
  }

  public async getData(path: string): Promise<any> {
    console.log("Getting data from path: ", path);
    const dbRef = ref(this.db);
    try {
      const snapshot = await get(child(dbRef, path));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
        return null;
      }
    } catch (error) {
      console.error("Error getting data: ", error);
      throw error;
    }
  }
}
