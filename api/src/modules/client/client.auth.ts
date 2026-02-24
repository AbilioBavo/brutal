import { AuthConfigs } from 'arkos/auth';
import { authService } from "arkos/services";

export const clientAccessControl = {
  Create: {
    roles: [],
    name: "Create Client",
    description: "Permission to create new client records",
  },
  Update: {
    roles: [],
    name: "Update Client",
    description: "Permission to update existing client records",
  },
  Delete: {
    roles: [],
    name: "Delete Client",
    description: "Permission to delete client records",
  },
  View: {
    roles: [],
    name: "View Client",
    description: "Permission to view client records",
  },
} as const satisfies AuthConfigs["accessControl"];

function createClientPermission(action: string) {
  return authService.permission(action, "client", clientAccessControl);
}
export const clientPermissions = {
  canCreate: createClientPermission("Create"),
  canUpdate: createClientPermission("Update"),
  canDelete: createClientPermission("Delete"),
  canView: createClientPermission("View"),
};

export const clientAuthenticationControl = {
  Create: true,
  Update: true,
  Delete: true,
  View: true,
};

const clientAuthConfigs: AuthConfigs = {
  authenticationControl: clientAuthenticationControl,
  accessControl: clientAccessControl,
};

export default clientAuthConfigs;
