import { z } from "zod";

export const authSignUpSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." }).email("Please enter a valid email."),
  first_name: z.string().min(1, { message: "This field has to be filled." })
});

export const authSignInSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." }).email("Please enter a valid email."),
});

export const authOtpSchema = z.object({
  otp: z.string().min(4, { message: 'This field has to be filled.' }),
  email: z.string().min(1, { message: "This field has to be filled." }).email("Please enter a valid email."),
});

export const publisherSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." }).email("Please enter a valid email."),
});

export const createWorkspaceSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." }).email("Please enter a valid email."),
  name: z.string().min(1, { message: "This field has to be filled." })
});

export const createPostSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." }).email("Please enter a valid email."),
  title: z.string().min(1, { message: "This field has to be filled." }),
  audio: z.string().min(1, { message: "This field has to be filled." }),
  image: z.string().min(1, { message: "This field has to be filled." }),
  workspace_id: z.string().min(1, { message: "This field has to be filled." }),
});

export const createWorkspaceInviteSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." }).email("Please enter a valid email."),
  workspace_id: z.string().min(1, { message: "This field has to be filled." }),
  user_email: z.string().min(1, { message: "This field has to be filled." }).email("Please enter a valid email."),
});

export const invitationSignInSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." }).email("Please enter a valid email."),
  token: z.string().min(1, { message: "This field has to be filled." }),
});

export const invitationSignUpSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." }).email("Please enter a valid email."),
  token: z.string().min(1, { message: "This field has to be filled." }),
  first_name: z.string().min(1, { message: "This field has to be filled." })
});

export const inviteOtpSchema = z.object({
  otp: z.string().min(4, { message: 'This field has to be filled.' }),
  token: z.string().min(1, { message: "This field has to be filled." }),
  email: z.string().min(1, { message: "This field has to be filled." }).email("Please enter a valid email."),
});