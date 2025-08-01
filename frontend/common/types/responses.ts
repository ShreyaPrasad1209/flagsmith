export type EdgePagedResponse<T> = PagedResponse<T> & {
  last_evaluated_key?: string
  pages?: (string | undefined)[]
}
export type Approval = {
  user?: number
  group?: number
}
export type PagedResponse<T> = {
  count?: number
  next?: string
  previous?: string
  results: T[]
}

export interface GitHubPagedResponse<T> extends PagedResponse<T> {
  incomplete_results: boolean
}
export type FlagsmithValue = string | number | boolean | null

export type FeatureVersionState = {
  enabled: boolean
  feature: number
  feature_state_value: FeatureStateValue
  feature_segment: null | FeatureState['feature_segment']
  multivariate_feature_state_values: Omit<MultivariateFeatureStateValue, 'id'>[]
  live_from: FeatureState['live_from']
}
export type Operator = {
  value: string | null
  label: string
  hideValue?: boolean
  warning?: string
  valuePlaceholder?: string
}
export type ChangeRequestSummary = {
  id: number
  readOnly: boolean
  created_at: string
  updated_at: string
  description: string
  user: number
  committed_at: string | null
  committed_by: number | null
  deleted_at: string | null
  live_from: string | null
}
export type SegmentCondition = {
  delete?: boolean
  description?: string
  operator: string
  property: string
  value: string | number | null
}

export type SegmentConditionsError = {
  property?: string[]
  value?: string[]
}

export type SegmentRule = {
  type: string
  rules: SegmentRule[]

  delete?: boolean
  conditions: SegmentCondition[]
}
export type Segment = {
  id: number
  rules: SegmentRule[]
  uuid: string
  name: string
  description: string
  project: string | number
  feature?: number
  metadata: Metadata[] | []
}
export type Environment = {
  id: number
  name: string
  is_creating: boolean
  api_key: string
  description?: string
  banner_text?: string | null
  banner_colour?: string
  project: number
  minimum_change_request_approvals?: number | null
  allow_client_traits: boolean
  hide_sensitive_data: boolean
  total_segment_overrides?: number
  use_v2_feature_versioning: boolean
  metadata: Metadata[] | []
  use_identity_overrides_in_local_eval: boolean
  use_identity_composite_key_for_hashing: boolean
  hide_disabled_flags: boolean | null
  use_mv_v2_evaluation: boolean
  show_disabled_flags: boolean
  enabledFeatureVersioning?: boolean
}

export type Project = {
  id: number
  uuid: string
  name: string
  organisation: number
  hide_disabled_flags: boolean
  enable_dynamo_db: boolean
  migration_status: string
  use_edge_identities: boolean
  show_edge_identity_overrides_for_feature: boolean
  prevent_flag_defaults: boolean
  enable_realtime_updates: boolean
  max_segments_allowed?: number | null
  max_features_allowed?: number | null
  max_segment_overrides_allowed?: number | null
  total_features?: number
  stale_flags_limit_days?: number
  total_segments?: number
  environments: Environment[]
}
export type ImportStrategy = 'SKIP' | 'OVERWRITE_DESTRUCTIVE'

export type ExternalResource = {
  id?: number
  url: string
  type: string
  project?: number
  metadata?: { [key: string]: string | number | boolean }
  feature: number
}

export type ImportExportStatus = 'SUCCESS' | 'PROCESSING' | 'FAILED'

export type FeatureImport = {
  id: number
  status: ImportExportStatus
  strategy: string
  environment_id: number
  created_at: string
}

export type FeatureExport = {
  id: string
  name: string
  environment_id: string
  status: ImportExportStatus
  created_at: string
}
export type FeatureImportItem = {
  name: string
  default_enabled: boolean
  is_server_key_only: boolean
  initial_value: FlagsmithValue
  value: FlagsmithValue
  enabled: false
  multivariate: []
}
export type LaunchDarklyProjectImport = {
  id: number
  created_by: string
  created_at: string
  updated_at: string
  completed_at: string
  status: {
    requested_environment_count: number
    requested_flag_count: number
    result: string | null
    error_message: string | null
  }
  project: number
}

export type GithubResource = {
  html_url: string
  id: number
  number: number
  title: string
  state: string
  merged: boolean
  draft: boolean
}

export type GithubPaginatedRepos<T> = {
  total_count: number
  repository_selection: string
  results: T[]
}

export type Repository = {
  id: number
  name: string
  full_name: string
  owner: { login: string }
}

export type IntegrationFieldOption = { label: string; value: string }
export type IntegrationField = {
  key: string
  label: string
  default?: string
  hidden?: boolean
  inputType?: 'text' | 'checkbox'
  options?: IntegrationFieldOption[]
}

export type IntegrationData = {
  description: string
  docs?: string
  external: boolean
  image: string
  fields: IntegrationField[] | undefined
  isExternalInstallation: boolean
  perEnvironment: boolean
  title?: string
  organisation?: string
  project?: string
  isOauth?: boolean
}

export type ActiveIntegration = {
  id: string
  flagsmithEnvironment?: string
}

export type GithubRepository = {
  id: number
  github_configuration: number
  project: number
  repository_owner: string
  repository_name: string
  tagging_enabled: boolean
}

export type githubIntegration = {
  id: string
  installation_id: string
  organisation: string
}

export type GettingStartedTask = {
  name: string
  completed_at?: string
}
export type Onboarding = {
  tools: {
    completed: boolean
    selection: string[]
  }
  tasks: GettingStartedTask[]
}
export type User = {
  id: number
  email: string
  first_name: string
  last_name: string
  last_login: string
  uuid: string
  onboarding: Onboarding
}
export type GroupUser = Omit<User, 'role'> & {
  group_admin: boolean
}

export type ProjectSummary = Omit<Project, 'environments'>

export type UserGroupSummary = {
  external_id: string | null
  id: number
  is_default: boolean
  name: string
}

export type UserGroup = UserGroupSummary & {
  users: GroupUser[]
}

export type UserPermission = {
  user: User
  permissions: string[]
  admin: boolean
  id: number
  role?: number
}

export type DerivedPermission = {
  groups: {
    name: string
    id: number
  }[]
  roles: {
    name: string
    id: number
  }[]
}

export type Permission = {
  is_directly_granted: boolean
  permission_key: string
  tags: number[]
  derived_from: DerivedPermission
}
export type UserPermissions = {
  admin: boolean
  is_directly_granted: boolean
  derived_from: DerivedPermission
  permissions: Permission[]
}

export type RolePermission = Omit<UserPermission, 'permissions'> & {
  permissions: { permission_key: string; tags: number[] }[]
}
export type GroupPermission = Omit<UserPermission, 'user'> & {
  group: UserGroupSummary
}

export type AuditLogItem = {
  id: number
  created_date: string
  log: string
  author?: User
  environment?: Environment
  project: ProjectSummary
  related_object_uuid?: number
  related_feature_id?: number
  related_object_type:
    | 'FEATURE'
    | 'FEATURE_STATE'
    | 'ENVIRONMENT'
    | 'CHANGE_REQUEST'
    | 'SEGMENT'
    | 'EF_VERSION'
    | 'EDGE_IDENTITY'
  is_system_event: boolean
}

export type AuditLogDetail = AuditLogItem & {
  change_details: {
    field: string
    old: FlagsmithValue
    new: FlagsmithValue
  }[]
}
export type Subscription = {
  id: number
  uuid: string
  subscription_id: string | null
  subscription_date: string
  plan: string | null
  max_seats: number
  max_api_calls: number
  cancellation_date: string | null
  customer_id: string
  payment_method: string
  notes: string | null
}

export type Organisation = {
  id: number
  name: string
  created_date: string
  webhook_notification_email: string | null
  num_seats: number
  subscription: Subscription
  role: string
  persist_trait_data: boolean
  block_access_to_admin: boolean
  restrict_project_create_to_admin: boolean
}
export type Identity = {
  id: string
  identifier: string
  identity_uuid?: string
  dashboard_alias?: string
}

export type AvailablePermission = {
  key: string
  description: string
  supports_tag: boolean
}

export type APIKey = {
  active: boolean
  created_at: string
  expires_at: string | null
  id: number
  key: string
  name: string
}

export type TagType = 'STALE' | 'UNHEALTHY' | 'NONE'

export type Tag = {
  id: number
  color: string
  description: string
  project: number
  label: string
  is_system_tag: boolean
  is_permanent: boolean
  type: TagType
}

export type MultivariateFeatureStateValue = {
  id: number
  multivariate_feature_option: number
  percentage_allocation: number
}

export type FeatureStateValue = {
  boolean_value: boolean | null
  float_value?: number | null
  integer_value?: boolean | null
  string_value: string
  type: 'int' | 'unicode' | 'bool' | 'float'
}

export type MultivariateOption = {
  id: number
  uuid: string
  type: string
  integer_value?: number
  string_value: string
  boolean_value?: boolean
  default_percentage_allocation: number
}

export type FeatureType = 'STANDARD' | 'MULTIVARIATE'
export type TagStrategy = 'INTERSECTION' | 'UNION'

export type IdentityFeatureState = {
  feature: {
    id: number
    name: string
    type: FeatureType
  }
  identity?: string
  identity_uuid?: string
  enabled: boolean
  feature_state_value: FlagsmithValue
  segment: null
  overridden_by: string | null
  multivariate_feature_state_values?: {
    multivariate_feature_option: {
      value: number
    }
    percentage_allocation: number
  }[]
}

export type FeatureState = {
  change_request?: number
  created_at: string
  enabled: boolean
  environment: number
  environment_feature_version: string
  feature: number
  feature_segment?: {
    id: number
    priority: number
    segment: number
    uuid: string
  }
  feature_state_value: FlagsmithValue
  id: number
  identity?: number
  live_from?: string
  multivariate_feature_state_values: MultivariateFeatureStateValue[]
  updated_at: string
  uuid: string
  version?: number
  //Added by FE
  toRemove?: boolean
}

export type TypedFeatureState = Omit<FeatureState, 'feature_state_value'> & {
  feature_state_value: FeatureStateValue
}

export type ProjectFlag = {
  created_date: string
  default_enabled: boolean
  description?: string
  id: number
  initial_value: FlagsmithValue
  is_archived: boolean
  is_num_identity_overrides_complete: boolean
  is_server_key_only: boolean
  multivariate_options: MultivariateOption[]
  name: string
  num_identity_overrides: number | null
  num_segment_overrides: number | null
  owners: User[]
  owner_groups: UserGroupSummary[]
  metadata: Metadata[] | []
  project: number
  tags: number[]
  type: string
  uuid: string
}

export type FeatureListProviderData = {
  projectFlags: ProjectFlag[] | null
  environmentFlags: Record<number, FeatureState> | undefined
  error: boolean
  isLoading: boolean
}

export type FeatureListProviderActions = {
  toggleFlag: (
    projectId: string,
    environmentId: string,
    projectFlag: ProjectFlag,
    environmentFlags: FeatureState | undefined,
  ) => void
  removeFlag: (projectId: string, projectFlag: ProjectFlag) => void
}

export type AuthType = 'EMAIL' | 'GITHUB' | 'GOOGLE'

export type SignupType = 'NO_INVITE' | 'INVITE_EMAIL' | 'INVITE_LINK'

export type AttributeName = 'email' | 'first_name' | 'last_name' | 'groups'

export type Invite = {
  id: number
  email: string
  date_created: string
  invited_by: User
  link?: string
  permission_groups: number[]
}

export type InviteLink = {
  id: number
  hash: string
  date_created: string
  role: string
  expires_at: string | null
}

export type SubscriptionMeta = {
  max_seats: number | null
  audit_log_visibility_days: number | null
  feature_history_visibility_days: number | null
  max_api_calls: number | null
  max_projects: number | null
  payment_source: string | null
  chargebee_email: string | null
}

export type Account = {
  first_name: string
  last_name: string
  sign_up_type: SignupType
  id: number
  email: string
  auth_type: AuthType
  is_superuser: boolean
}
export type Role = {
  id: number
  name: string
  description?: string
  organisation: number
}

export type ChangeSet = {
  feature: number
  live_from: string | null
  feature_states_to_update: FeatureState[]
  feature_states_to_create: FeatureState[]
  segment_ids_to_delete_overrides: number[]
}

export type RolePermissionUser = {
  user: number
  role: number
  id: number
  role_name: string
}
export type RolePermissionGroup = {
  group: number
  role: number
  id: number
  role_name: string
}
export type FeatureConflict = {
  segment_id: number | null
  original_cr_id: number | null
  published_at: string
  is_environment_default: boolean
}
export type FeatureStateWithConflict = TypedFeatureState & {
  conflict?: FeatureConflict
}
export type ChangeRequest = {
  id: number
  created_at: string
  updated_at: string
  environment: number
  title: string
  description: string | number
  feature_states: FeatureState[]
  user: number
  committed_at: number | null
  committed_by: number | null
  deleted_at: null
  approvals: {
    id: number
    user: number
    approved_at: null | string
  }[]
  change_sets?: ChangeSet[]
  is_approved: boolean
  is_committed: boolean
  group_assignments: { group: number }[]
  environment_feature_versions: {
    uuid: string
    feature_states: FeatureState[]
  }[]

  conflicts: FeatureConflict[]
}
export type FeatureVersion = {
  created_at: string
  updated_at: string
  feature?: number
  previous_version_uuid?: string
  published: boolean
  live_from: string
  uuid: string
  is_live: boolean
  published_by: number | null
  created_by: number | null
}

export type Metadata = {
  id?: number
  model_field: number | string
  field_value: string
}

export type MetadataField = {
  id: number
  name: string
  type: string
  description: string
  organisation: number
}

export type ContentType = {
  [key: string]: any
  id: number
  app_label: string
  model: string
}

export type isRequiredFor = {
  content_type: number
}

export type MetadataModelField = {
  id: string
  field: number
  content_type: number | string
  is_required_for: isRequiredFor[]
}

export type SAMLConfiguration = {
  id: number
  organisation: number
  name: string
  frontend_url: string
  idp_metadata_xml?: string
  allow_idp_initiated?: boolean
}

export type SAMLAttributeMapping = {
  id: number
  saml_configuration: number
  django_attribute_name: AttributeName
  idp_attribute_name: string
}
export type ServersideSplitTestResult = {
  conversion_count: number
  evaluation_count: number
  feature: {
    created_date: string
    default_enabled: boolean
    description: any
    id: number
    initial_value: string
    name: string
    type: string
  }
  pvalue: number
  value_data: FeatureStateValue
}

export type HealthEventType = 'HEALTHY' | 'UNHEALTHY'

export type FeatureHealthEventReasonTextBlock = {
  text: string
  title?: string
}

export type FeatureHealthEventReasonUrlBlock = {
  url: string
  title?: string
}

export type HealthEventReason = {
  text_blocks: FeatureHealthEventReasonTextBlock[]
  url_blocks: FeatureHealthEventReasonUrlBlock[]
}

export type HealthEvent = {
  created_at: string
  environment: number
  feature: number
  provider_name: string
  reason: HealthEventReason | null
  type: HealthEventType
}

export type HealthProvider = {
  id: number
  created_by: string
  name: string
  project: number
  webhook_url: number
}

export type Version = {
  tag: string
  backend_sha: string
  frontend_sha: string
  frontend: {
    ci_commit_sha?: string
    image_tag?: string
  }
  backend: {
    ci_commit_sha: string
    image_tag: string
    has_email_provider: boolean
    is_enterprise: boolean
    is_saas: boolean
    'self_hosted_data'?: {
      'has_users': boolean
      'has_logins': boolean
    }
  }
}

export type PConfidence =
  | 'VERY_LOW'
  | 'LOW'
  | 'REASONABLE'
  | 'HIGH'
  | 'VERY_HIGH'
export type SplitTestResult = {
  results: {
    conversion_count: number
    evaluation_count: number
    conversion_percentage: number
    pvalue: number
    confidence: PConfidence
    value_data: FeatureStateValue
  }[]
  feature: {
    created_date: string
    default_enabled: boolean
    description: any
    id: number
    initial_value: string
    name: string
    type: string
  }
  max_conversion_percentage: number
  max_conversion_count: number
  conversion_variance: number
  max_conversion_pvalue: number
}

export type ConversionEvent = {
  id: number
  name: string
  updated_at: string
  created_at: string
}
export type Webhook = {
  id: number
  url: string
  secret: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export type AccountModel = User & {
  organisations: Organisation[]
}

export type IdentityTrait = {
  id: number | string
  trait_key: string
  trait_value: FlagsmithValue
}

export enum PipelineStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
}

export interface ReleasePipeline {
  id: number
  name: string
  project: number
  description: string
  stages_count: number
  published_at: string
  published_by: number
  features_count: number
}

export interface SingleReleasePipeline extends ReleasePipeline {
  stages: PipelineStage[]
  completed_features: number[]
}

export enum StageTriggerType {
  ON_ENTER = 'ON_ENTER',
  WAIT_FOR = 'WAIT_FOR',
}

export type StageTriggerBody = { wait_for?: string } | null

export type StageTrigger = {
  trigger_type: StageTriggerType
  trigger_body: StageTriggerBody
}

export enum StageActionType {
  TOGGLE_FEATURE = 'TOGGLE_FEATURE',
  TOGGLE_FEATURE_FOR_SEGMENT = 'TOGGLE_FEATURE_FOR_SEGMENT',
}

export type StageActionBody = { enabled: boolean; segment_id?: number }
export interface StageAction {
  id: number
  action_type: StageActionType
  action_body: StageActionBody
}

export type PipelineStage = {
  id: number
  name: string
  pipeline: number
  environment: number
  order: number
  trigger: StageTrigger
  actions: StageAction[]
  features: number[]
}

export type Res = {
  segments: PagedResponse<Segment>
  segment: Segment
  auditLogs: PagedResponse<AuditLogItem>
  organisationLicence: {}
  organisations: PagedResponse<Organisation>
  projects: ProjectSummary[]
  project: Project
  environments: PagedResponse<Environment>
  webhook: Webhook
  webhooks: Webhook[]
  organisationUsage: {
    totals: {
      flags: number
      environmentDocument: number
      identities: number
      traits: number
      total: number
    }
    events_list: {
      environment_document: number | null
      flags: number | null
      identities: number | null
      traits: number | null
      name: string
    }[]
  }
  identity: { id: string } //todo: we don't consider this until we migrate identity-store
  identities: EdgePagedResponse<Identity>
  permission: Record<string, boolean> & {
    ADMIN: boolean
    tag_based_permissions?: { permissions: string[]; tags: number[] }[]
  }
  availablePermissions: AvailablePermission[]
  tag: Tag
  tags: Tag[]
  healthEvents: HealthEvent[]
  healthProvider: HealthProvider
  healthProviders: HealthProvider[]
  account: Account
  userEmail: {}
  groupAdmin: { id: string }
  groups: PagedResponse<UserGroup>
  group: UserGroup
  userInvites: PagedResponse<Invite>
  createdUserInvite: Invite[]
  myGroups: PagedResponse<UserGroupSummary>
  createSegmentOverride: {
    id: number
    segment: number
    priority: number
    uuid: string
    environment: number
    feature: number
    feature_segment_value: {
      id: number
      environment: number
      enabled: boolean
      feature: number
      feature_state_value: FeatureStateValue
      deleted_at: string
      uuid: string
      created_at: string
      updated_at: string
      version: number
      live_from: string
      identity: string
      change_request: string
    }
    value: string
  }
  featureVersion: FeatureVersion
  versionFeatureState: FeatureState[]
  role: Role
  roles: PagedResponse<Role>
  rolePermission: PagedResponse<RolePermission>
  projectFlags: PagedResponse<ProjectFlag>
  projectFlag: ProjectFlag
  identityFeatureStatesAll: IdentityFeatureState[]
  createRolesPermissionUsers: RolePermissionUser
  rolesPermissionUsers: PagedResponse<RolePermissionUser>
  createRolePermissionGroup: RolePermissionGroup
  rolePermissionGroup: PagedResponse<RolePermissionGroup>
  subscriptionMetadata: SubscriptionMeta
  environment: Environment
  metadataModelFieldList: PagedResponse<MetadataModelField>
  metadataModelField: MetadataModelField
  metadataList: PagedResponse<MetadataField>
  metadataField: MetadataField
  launchDarklyProjectImport: LaunchDarklyProjectImport
  launchDarklyProjectsImport: LaunchDarklyProjectImport[]
  roleMasterApiKey: { id: number; master_api_key: string; role: number }
  masterAPIKeyWithMasterAPIKeyRoles: {
    id: string
    prefix: string
    roles: RolePermissionUser[]
  }
  userWithRoles: PagedResponse<Role>
  groupWithRole: PagedResponse<Role>
  changeRequests: PagedResponse<ChangeRequestSummary>
  groupSummaries: UserGroupSummary[]
  supportedContentType: ContentType[]
  externalResource: PagedResponse<ExternalResource>
  githubIntegrations: PagedResponse<githubIntegration>
  githubRepository: PagedResponse<GithubRepository>
  githubResources: GitHubPagedResponse<GithubResource>
  githubRepos: GithubPaginatedRepos<Repository>
  segmentPriorities: {}
  featureSegment: FeatureState['feature_segment']
  featureVersions: PagedResponse<FeatureVersion>
  users: User[]
  enableFeatureVersioning: { id: string }
  auditLogItem: AuditLogDetail
  featureExport: { id: string }
  featureExports: PagedResponse<FeatureExport>
  flagsmithProjectImport: { id: string }
  featureImports: PagedResponse<FeatureImport>
  serversideEnvironmentKeys: APIKey[]
  userGroupPermissions: GroupPermission[]
  identityFeatureStates: IdentityFeatureState[]
  cloneidentityFeatureStates: IdentityFeatureState
  featureStates: PagedResponse<FeatureState>
  samlConfiguration: SAMLConfiguration
  samlConfigurations: PagedResponse<SAMLConfiguration>
  samlMetadata: {
    entity_id: string
    response_url: string
    metadata_xml: string
  }
  samlAttributeMapping: PagedResponse<SAMLAttributeMapping>
  identitySegments: PagedResponse<Segment>
  organisationWebhooks: PagedResponse<Webhook>
  identityTrait: { id: string }
  identityTraits: IdentityTrait[]
  conversionEvents: PagedResponse<ConversionEvent>
  splitTest: PagedResponse<SplitTestResult>
  onboardingSupportOptIn: { id: string }
  environmentMetrics: {
    metrics: {
      value: number
      description: string
      name: string
      entity: 'features' | 'identities' | 'segments' | 'workflows'
      rank: number
    }[]
  }
  profile: User
  onboarding: {}
  userPermissions: UserPermissions
  releasePipelines: PagedResponse<ReleasePipeline>
  releasePipeline: SingleReleasePipeline
  pipelineStages: PagedResponse<PipelineStage>
  pipelineStage: PipelineStage
  // END OF TYPES
}
