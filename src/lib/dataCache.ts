type CACHE_TAG =
  | "users"
  | "organizations"
  | "jobListings"
  | "userNotificationSettings"
  | "userResumes"
  | "JobListingApplications"
  | "OrganizationUserSettings";

export function getGlobalTag(tag: CACHE_TAG) {
  return `global:${tag}` as const;
}

export function getIdTag(tag: CACHE_TAG, id: string){
    return `id:${id}-${tag}` as const
}