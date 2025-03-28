
import { ReservationBaseService } from './base-service';
import { ReservationCreationService } from './creation-service';
import { ReservationGoogleSyncService } from './google-sync-service';
import { ReservationAutoSyncService } from './auto-sync-service';
import { Reservation } from '@/types';

/**
 * Classe principale qui regroupe toutes les fonctionnalités liées aux réservations
 */
export class ReservationService {
  // Opérations de base
  static getReservations = ReservationBaseService.getReservations;
  static deleteReservation = ReservationBaseService.deleteReservation;
  static updateReservation = ReservationBaseService.updateReservation;
  
  // Création de réservation
  static createReservation = ReservationCreationService.createReservation;
  
  // Synchronisation Google Calendar
  static syncWithGoogleCalendar = ReservationGoogleSyncService.syncWithGoogleCalendar;
  static importFromGoogleCalendar = ReservationGoogleSyncService.importFromGoogleCalendar;
  
  // Synchronisation automatique
  static triggerSync = ReservationAutoSyncService.triggerSync;
  static getSyncLogs = ReservationAutoSyncService.getSyncLogs;
  static updateAutoSyncSettings = ReservationAutoSyncService.updateAutoSyncSettings;
  static checkSyncStatus = ReservationAutoSyncService.checkSyncStatus;
  static resetGoogleConnection = ReservationAutoSyncService.resetGoogleConnection;
}
