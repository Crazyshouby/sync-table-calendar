
import { GoogleCalendarApiClient } from '../api-client';
import { GoogleCalendarAuthService } from '../auth-service';

export class EventDeletionService {
  // Supprime un événement de Google Calendar
  static async deleteEvent(eventId: string): Promise<boolean> {
    try {
      if (!(await GoogleCalendarAuthService.isConnected())) {
        console.log('Google Calendar non connecté, impossible de supprimer l\'événement');
        return false;
      }
      
      console.log(`Suppression de l'événement Google Calendar avec l'ID: ${eventId}`);
      
      // Appel à l'API via le client pour supprimer l'événement
      await GoogleCalendarApiClient.callApi(
        `calendars/primary/events/${eventId}`, 
        'DELETE'
      );
      
      console.log('Événement supprimé avec succès de Google Calendar');
      return true;
    } catch (error) {
      console.error('Exception lors de la suppression de l\'événement Google Calendar:', error);
      return false;
    }
  }
}
