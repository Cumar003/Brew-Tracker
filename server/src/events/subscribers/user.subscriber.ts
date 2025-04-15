import { Request } from "express";
import { eventBus } from "../EventBus";
import { IUser } from "../../models/user";
import { USER_EVENTS } from "../user.events";
import { LoggerUtils } from "../../utils/loggerUtils";

export interface ListenerProps {
    req: Request,
    user: IUser
};

eventBus.on(USER_EVENTS.REGISTERED, ({ req, user }: ListenerProps) => {
    LoggerUtils.logUserEvent("User Registered", user, req);
  });
  
  eventBus.on(USER_EVENTS.LOGGED_IN, ({ req, user }: ListenerProps) => {
    LoggerUtils.logUserEvent("User Logged In", user, req);
  });
  
  eventBus.on(USER_EVENTS.LOGGED_OUT, ({ req, user }: ListenerProps) => {
    LoggerUtils.logUserEvent("User Logged Out", user, req);
  });
  
  eventBus.on(USER_EVENTS.REFRESH_TOKEN_REQUESTED, ({ req, user }: ListenerProps) => {
    LoggerUtils.logUserEvent("Refresh Token Requested", user, req);
  });
  
  eventBus.on(USER_EVENTS.PASSWORD_RESET_REQUESTED, ({ req, user }: ListenerProps) => {
    LoggerUtils.logUserEvent("Password Reset Requested", user, req);
  });
  
  eventBus.on(USER_EVENTS.PASSWORD_CHANGED, ({ req, user }: ListenerProps) => {
    LoggerUtils.logUserEvent("Password Changed", user, req);
  });
  
  eventBus.on(USER_EVENTS.EMAIL_VERIFIED, ({ req, user }: ListenerProps) => {
    LoggerUtils.logUserEvent("Email Verified", user, req);
  });
  
  eventBus.on(USER_EVENTS.EMAIL_VERIFICATION_REQUESTED, ({ req, user }: ListenerProps) => {
    LoggerUtils.logUserEvent("Email Verification Requested", user, req);
  });
  
  eventBus.on(USER_EVENTS.PROFILE_UPDATED, ({ req, user }: ListenerProps) => {
    LoggerUtils.logUserEvent("Profile Updated", user, req);
  });
  
  eventBus.on(USER_EVENTS.USER_DELETED, ({ req, user }: ListenerProps) => {
    LoggerUtils.logUserEvent("User Deleted", user, req);
  });
  
  eventBus.on(USER_EVENTS.APPOINTMENT_BOOKED, ({ req, user }: ListenerProps) => {
    LoggerUtils.logUserEvent("Appointment Booked", user, req);
  });
  
  eventBus.on(USER_EVENTS.APPOINTMENT_CANCELLED, ({ req, user }: ListenerProps) => {
    LoggerUtils.logUserEvent("Appointment Cancelled", user, req);
  });
