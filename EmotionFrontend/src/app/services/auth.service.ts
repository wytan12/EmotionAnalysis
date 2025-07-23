import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api'; // Adjust based on your backend URL

  constructor(private http: HttpClient) {}

  // Store token in localStorage
  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Remove token from localStorage
  removeToken(): void {
    localStorage.removeItem('access_token');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Get HTTP headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  // Initialize session with backend (send token to create session)
  initializeSession(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token available');
    }

    // Send token to backend to initialize session
    return this.http.post(`${this.baseUrl}/auth/initialize-session`, 
      { access_token: token }, 
      { headers: this.getAuthHeaders(), withCredentials: true }
    );
  }

  // Get user info from backend
  getUserInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user-info`, 
      { headers: this.getAuthHeaders(), withCredentials: true }
    );
  }

  // Get community data from backend
  getCommunityData(communityId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/community-data/community-id/${communityId}`, 
      { headers: this.getAuthHeaders(), withCredentials: true }
    );
  }
}
