import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Rating {
  emotionId: string;
  intensity: number;
}

export interface Note {
  _id: string;
  title: string;
  authors: string[];
  data: {
    body: string;
    languages: any;
  };
  created: string;
}

export interface Action {
  _id: string;
  ratings: Rating[];
  authors: string[];
  actionType: string;
  communityId: string;
  created: string;
  inViews: any[];
  note: Note;
}

export interface ProcessedData {
  noteId: string;
  intensities: {
    [emotionId: string]: {
      intensity_1star: number;
      intensity_2star: number;
      intensity_3star: number;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost/api/community-data';

  constructor(private http: HttpClient) {}

  getCommunityData(): Observable<ProcessedData[]> {
    return this.http.get<Action[]>(this.apiUrl).pipe(
      map(data => this.processData(data))
    );
  }

  private processData(data: Action[]): ProcessedData[] {
    // Filter the data to include only `actionType = read`
    const readActions = data.filter(item => item.actionType === 'read');

    // Group by `note_id` and count intensities
    const result = readActions.reduce((acc: any, curr: Action) => {
      const noteId = curr.note._id;

      if (!acc[noteId]) {
        acc[noteId] = {
          noteId: noteId,
          intensities: {}
        };
      }

      curr.ratings.forEach(rating => {
        const emotion = rating.emotionId;
        const intensity = rating.intensity;

        if (!acc[noteId].intensities[emotion]) {
          acc[noteId].intensities[emotion] = {
            intensity_1star: 0,
            intensity_2star: 0,
            intensity_3star: 0
          };
        }

        // Increment the count based on the intensity
        if (intensity === 1) {
          acc[noteId].intensities[emotion].intensity_1star += 1;
        } else if (intensity === 2) {
          acc[noteId].intensities[emotion].intensity_2star += 1;
        } else if (intensity === 3) {
          acc[noteId].intensities[emotion].intensity_3star += 1;
        }
      });

      return acc;
    }, {});

    // Convert the result object into an array
    return Object.values(result);
  }
}
