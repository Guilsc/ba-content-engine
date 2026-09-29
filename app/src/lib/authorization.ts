import "server-only";

export type PlatformRole = "owner";
export type WorkspaceRole = "admin" | "creator" | "viewer";

export interface AuthorizationContext {
  userId: string;
  workspaceId: string;
  workspaceRole: WorkspaceRole;
  platformRole: PlatformRole | null;
}

const WRITE_ROLES: WorkspaceRole[] = ["admin", "creator"];

export function canOperateContent(role: WorkspaceRole) {
  return WRITE_ROLES.includes(role);
}

export function canManageWorkspace(role: WorkspaceRole) {
  return role === "admin";
}

export function canViewMissionControl(role: WorkspaceRole) {
  return role === "admin" || role === "creator";
}

export function isPlatformOwner(context: AuthorizationContext) {
  return context.platformRole === "owner";
}

export function assertWorkspaceWrite(context: AuthorizationContext) {
  if (!canOperateContent(context.workspaceRole)) {
    throw new Error("This workspace role is read-only.");
  }
}

export function assertWorkspaceAdmin(context: AuthorizationContext) {
  if (!canManageWorkspace(context.workspaceRole)) {
    throw new Error("Workspace administrator access is required.");
  }
}
