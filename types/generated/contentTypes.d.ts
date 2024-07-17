import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginCommentsComment extends Schema.CollectionType {
  collectionName: 'comments_comment';
  info: {
    tableName: 'plugin-comments-comments';
    singularName: 'comment';
    pluralName: 'comments';
    displayName: 'Comment';
    description: 'Comment content type';
    kind: 'collectionType';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    content: Attribute.Text & Attribute.Required;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    blockedThread: Attribute.Boolean & Attribute.DefaultTo<false>;
    blockReason: Attribute.String;
    authorUser: Attribute.Relation<
      'plugin::comments.comment',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    authorId: Attribute.String;
    authorName: Attribute.String;
    authorEmail: Attribute.Email;
    authorAvatar: Attribute.String;
    isAdminComment: Attribute.Boolean;
    removed: Attribute.Boolean;
    approvalStatus: Attribute.String;
    related: Attribute.String;
    reports: Attribute.Relation<
      'plugin::comments.comment',
      'oneToMany',
      'plugin::comments.comment-report'
    >;
    threadOf: Attribute.Relation<
      'plugin::comments.comment',
      'oneToOne',
      'plugin::comments.comment'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::comments.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::comments.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginCommentsCommentReport extends Schema.CollectionType {
  collectionName: 'comments_comment-report';
  info: {
    tableName: 'plugin-comments-reports';
    singularName: 'comment-report';
    pluralName: 'comment-reports';
    displayName: 'Reports';
    description: 'Reports content type';
    kind: 'collectionType';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    content: Attribute.Text;
    reason: Attribute.Enumeration<['BAD_LANGUAGE', 'DISCRIMINATION', 'OTHER']> &
      Attribute.Required &
      Attribute.DefaultTo<'OTHER'>;
    resolved: Attribute.Boolean & Attribute.DefaultTo<false>;
    related: Attribute.Relation<
      'plugin::comments.comment-report',
      'manyToOne',
      'plugin::comments.comment'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::comments.comment-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::comments.comment-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBZexhibitorRegistrationBZexhibitorRegistration
  extends Schema.CollectionType {
  collectionName: 'b_zexhibitor_registrations';
  info: {
    singularName: 'b-zexhibitor-registration';
    pluralName: 'b-zexhibitor-registrations';
    displayName: 'BZexhibitorRegistration';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    delegationName: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    delegationRepresentative: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    phoneNumber: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    email: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    requested_area: Attribute.Relation<
      'api::b-zexhibitor-registration.b-zexhibitor-registration',
      'manyToOne',
      'api::requested-area.requested-area'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::b-zexhibitor-registration.b-zexhibitor-registration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::b-zexhibitor-registration.b-zexhibitor-registration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::b-zexhibitor-registration.b-zexhibitor-registration',
      'oneToMany',
      'api::b-zexhibitor-registration.b-zexhibitor-registration'
    >;
    locale: Attribute.String;
  };
}

export interface ApiEntityClassificationEntityClassification
  extends Schema.CollectionType {
  collectionName: 'entity_classifications';
  info: {
    singularName: 'entity-classification';
    pluralName: 'entity-classifications';
    displayName: 'EntityClassification';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    g_zentity_registrations: Attribute.Relation<
      'api::entity-classification.entity-classification',
      'oneToMany',
      'api::g-zentity-registration.g-zentity-registration'
    >;
    g_zexhibitor_registrations: Attribute.Relation<
      'api::entity-classification.entity-classification',
      'oneToMany',
      'api::g-zexhibitor-registration.g-zexhibitor-registration'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::entity-classification.entity-classification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::entity-classification.entity-classification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::entity-classification.entity-classification',
      'oneToMany',
      'api::entity-classification.entity-classification'
    >;
    locale: Attribute.String;
  };
}

export interface ApiGZentityRegistrationGZentityRegistration
  extends Schema.CollectionType {
  collectionName: 'g_zentity_registrations';
  info: {
    singularName: 'g-zentity-registration';
    pluralName: 'g-zentity-registrations';
    displayName: 'GZentityRegistration';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    entityName: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    headQuarterCity: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    entityOfficialWebsite: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    entityOfficialEmail: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    focalPointName: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    focalPointTitle: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    focalPointMobile: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    focalPointEmail: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    entityClassificationId: Attribute.Relation<
      'api::g-zentity-registration.g-zentity-registration',
      'manyToOne',
      'api::entity-classification.entity-classification'
    >;
    sectorFieldId: Attribute.Relation<
      'api::g-zentity-registration.g-zentity-registration',
      'manyToOne',
      'api::sector-field.sector-field'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::g-zentity-registration.g-zentity-registration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::g-zentity-registration.g-zentity-registration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::g-zentity-registration.g-zentity-registration',
      'oneToMany',
      'api::g-zentity-registration.g-zentity-registration'
    >;
    locale: Attribute.String;
  };
}

export interface ApiGZexhibitorRegistrationGZexhibitorRegistration
  extends Schema.CollectionType {
  collectionName: 'g_zexhibitor_registrations';
  info: {
    singularName: 'g-zexhibitor-registration';
    pluralName: 'g-zexhibitor-registrations';
    displayName: 'GZexhibitorRegistration';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    entityName: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    headQuarterCity: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    manyBranches: Attribute.Integer &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    logoFile: Attribute.Media<'images', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    BriefAbout: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    numStanding: Attribute.Integer &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    entityCEO: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    linkedIn: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    twitter: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    facebook: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    instagram: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    youtube: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    entityOfficialWebsite: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    entityOfficialEmail: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    focalPointName: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    focalPointTitle: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    focalPointMobile: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    focalPointEmail: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    specificRequests: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    entityClassificationId: Attribute.Relation<
      'api::g-zexhibitor-registration.g-zexhibitor-registration',
      'manyToOne',
      'api::entity-classification.entity-classification'
    >;
    sectorFieldId: Attribute.Relation<
      'api::g-zexhibitor-registration.g-zexhibitor-registration',
      'manyToOne',
      'api::sector-field.sector-field'
    >;
    manyEmployeeId: Attribute.Relation<
      'api::g-zexhibitor-registration.g-zexhibitor-registration',
      'manyToOne',
      'api::many-employee.many-employee'
    >;
    levelRepresentationId: Attribute.Relation<
      'api::g-zexhibitor-registration.g-zexhibitor-registration',
      'manyToOne',
      'api::level-representation.level-representation'
    >;
    planningvisitorsSpaceId: Attribute.Relation<
      'api::g-zexhibitor-registration.g-zexhibitor-registration',
      'manyToOne',
      'api::planningvisitors-space.planningvisitors-space'
    >;
    prizesVisitorId: Attribute.Relation<
      'api::g-zexhibitor-registration.g-zexhibitor-registration',
      'manyToOne',
      'api::prizes-visitor.prizes-visitor'
    >;
    partnershipAgreementId: Attribute.Relation<
      'api::g-zexhibitor-registration.g-zexhibitor-registration',
      'manyToOne',
      'api::partnership-agreement.partnership-agreement'
    >;
    attachedFile: Attribute.Media<'images' | 'files'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    RequestedAreaId: Attribute.Relation<
      'api::g-zexhibitor-registration.g-zexhibitor-registration',
      'manyToOne',
      'api::requested-area.requested-area'
    >;
    initiativesObjectivesId: Attribute.Relation<
      'api::g-zexhibitor-registration.g-zexhibitor-registration',
      'manyToOne',
      'api::lkp-answer.lkp-answer'
    >;
    partnershipsObjectivesId: Attribute.Relation<
      'api::g-zexhibitor-registration.g-zexhibitor-registration',
      'manyToOne',
      'api::lkp-answer.lkp-answer'
    >;
    attendedConferencesId: Attribute.Relation<
      'api::g-zexhibitor-registration.g-zexhibitor-registration',
      'manyToOne',
      'api::lkp-answer.lkp-answer'
    >;
    nominatedInstitutionsId: Attribute.Relation<
      'api::g-zexhibitor-registration.g-zexhibitor-registration',
      'manyToOne',
      'api::lkp-answer.lkp-answer'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::g-zexhibitor-registration.g-zexhibitor-registration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::g-zexhibitor-registration.g-zexhibitor-registration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::g-zexhibitor-registration.g-zexhibitor-registration',
      'oneToMany',
      'api::g-zexhibitor-registration.g-zexhibitor-registration'
    >;
    locale: Attribute.String;
  };
}

export interface ApiGZindividualRegistrationGZindividualRegistration
  extends Schema.CollectionType {
  collectionName: 'g_zindividual_registrations';
  info: {
    singularName: 'g-zindividual-registration';
    pluralName: 'g-zindividual-registrations';
    displayName: 'GZindividualRegistration';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    fullName: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    phoneNumber: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    email: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    jobTitle: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    organizationName: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    titleId: Attribute.Relation<
      'api::g-zindividual-registration.g-zindividual-registration',
      'manyToOne',
      'api::title.title'
    >;
    qualificationId: Attribute.Relation<
      'api::g-zindividual-registration.g-zindividual-registration',
      'manyToOne',
      'api::qualification.qualification'
    >;
    organizationCategoryId: Attribute.Relation<
      'api::g-zindividual-registration.g-zindividual-registration',
      'manyToOne',
      'api::organization-category.organization-category'
    >;
    residenceId: Attribute.Relation<
      'api::g-zindividual-registration.g-zindividual-registration',
      'manyToOne',
      'api::residence.residence'
    >;
    nationalityId: Attribute.Relation<
      'api::g-zindividual-registration.g-zindividual-registration',
      'manyToOne',
      'api::nationality.nationality'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::g-zindividual-registration.g-zindividual-registration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::g-zindividual-registration.g-zindividual-registration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::g-zindividual-registration.g-zindividual-registration',
      'oneToMany',
      'api::g-zindividual-registration.g-zindividual-registration'
    >;
    locale: Attribute.String;
  };
}

export interface ApiLevelRepresentationLevelRepresentation
  extends Schema.CollectionType {
  collectionName: 'level_representations';
  info: {
    singularName: 'level-representation';
    pluralName: 'level-representations';
    displayName: 'LevelRepresentation';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    g_zexhibitor_registrations: Attribute.Relation<
      'api::level-representation.level-representation',
      'oneToMany',
      'api::g-zexhibitor-registration.g-zexhibitor-registration'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::level-representation.level-representation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::level-representation.level-representation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::level-representation.level-representation',
      'oneToMany',
      'api::level-representation.level-representation'
    >;
    locale: Attribute.String;
  };
}

export interface ApiLkpAnswerLkpAnswer extends Schema.CollectionType {
  collectionName: 'lkp_answers';
  info: {
    singularName: 'lkp-answer';
    pluralName: 'lkp-answers';
    displayName: 'LKPAnswer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    initiativesObjectives: Attribute.Relation<
      'api::lkp-answer.lkp-answer',
      'oneToMany',
      'api::g-zexhibitor-registration.g-zexhibitor-registration'
    >;
    partnershipsObjectives: Attribute.Relation<
      'api::lkp-answer.lkp-answer',
      'oneToMany',
      'api::g-zexhibitor-registration.g-zexhibitor-registration'
    >;
    attendedConferences: Attribute.Relation<
      'api::lkp-answer.lkp-answer',
      'oneToMany',
      'api::g-zexhibitor-registration.g-zexhibitor-registration'
    >;
    nominatedInstitutions: Attribute.Relation<
      'api::lkp-answer.lkp-answer',
      'oneToMany',
      'api::g-zexhibitor-registration.g-zexhibitor-registration'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::lkp-answer.lkp-answer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::lkp-answer.lkp-answer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::lkp-answer.lkp-answer',
      'oneToMany',
      'api::lkp-answer.lkp-answer'
    >;
    locale: Attribute.String;
  };
}

export interface ApiManyEmployeeManyEmployee extends Schema.CollectionType {
  collectionName: 'many_employees';
  info: {
    singularName: 'many-employee';
    pluralName: 'many-employees';
    displayName: 'ManyEmployee';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    g_zexhibitor_registrations: Attribute.Relation<
      'api::many-employee.many-employee',
      'oneToMany',
      'api::g-zexhibitor-registration.g-zexhibitor-registration'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::many-employee.many-employee',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::many-employee.many-employee',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::many-employee.many-employee',
      'oneToMany',
      'api::many-employee.many-employee'
    >;
    locale: Attribute.String;
  };
}

export interface ApiNationalityNationality extends Schema.CollectionType {
  collectionName: 'nationalities';
  info: {
    singularName: 'nationality';
    pluralName: 'nationalities';
    displayName: 'Nationality';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    g_zindividual_registrations: Attribute.Relation<
      'api::nationality.nationality',
      'oneToMany',
      'api::g-zindividual-registration.g-zindividual-registration'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::nationality.nationality',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::nationality.nationality',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::nationality.nationality',
      'oneToMany',
      'api::nationality.nationality'
    >;
    locale: Attribute.String;
  };
}

export interface ApiOrganizationCategoryOrganizationCategory
  extends Schema.CollectionType {
  collectionName: 'organization_categories';
  info: {
    singularName: 'organization-category';
    pluralName: 'organization-categories';
    displayName: 'OrganizationCategory';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    g_zindividual_registrations: Attribute.Relation<
      'api::organization-category.organization-category',
      'oneToMany',
      'api::g-zindividual-registration.g-zindividual-registration'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::organization-category.organization-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::organization-category.organization-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::organization-category.organization-category',
      'oneToMany',
      'api::organization-category.organization-category'
    >;
    locale: Attribute.String;
  };
}

export interface ApiPartnershipAgreementPartnershipAgreement
  extends Schema.CollectionType {
  collectionName: 'partnership_agreements';
  info: {
    singularName: 'partnership-agreement';
    pluralName: 'partnership-agreements';
    displayName: 'PartnershipAgreement';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    g_zexhibitor_registrations: Attribute.Relation<
      'api::partnership-agreement.partnership-agreement',
      'oneToMany',
      'api::g-zexhibitor-registration.g-zexhibitor-registration'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::partnership-agreement.partnership-agreement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::partnership-agreement.partnership-agreement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::partnership-agreement.partnership-agreement',
      'oneToMany',
      'api::partnership-agreement.partnership-agreement'
    >;
    locale: Attribute.String;
  };
}

export interface ApiPlanningvisitorsSpacePlanningvisitorsSpace
  extends Schema.CollectionType {
  collectionName: 'planningvisitors_spaces';
  info: {
    singularName: 'planningvisitors-space';
    pluralName: 'planningvisitors-spaces';
    displayName: 'PlanningvisitorsSpace';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    g_zexhibitor_registrations: Attribute.Relation<
      'api::planningvisitors-space.planningvisitors-space',
      'oneToMany',
      'api::g-zexhibitor-registration.g-zexhibitor-registration'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::planningvisitors-space.planningvisitors-space',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::planningvisitors-space.planningvisitors-space',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::planningvisitors-space.planningvisitors-space',
      'oneToMany',
      'api::planningvisitors-space.planningvisitors-space'
    >;
    locale: Attribute.String;
  };
}

export interface ApiPrizesVisitorPrizesVisitor extends Schema.CollectionType {
  collectionName: 'prizes_visitors';
  info: {
    singularName: 'prizes-visitor';
    pluralName: 'prizes-visitors';
    displayName: 'PrizesVisitor';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    g_zexhibitor_registrations: Attribute.Relation<
      'api::prizes-visitor.prizes-visitor',
      'oneToMany',
      'api::g-zexhibitor-registration.g-zexhibitor-registration'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::prizes-visitor.prizes-visitor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::prizes-visitor.prizes-visitor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::prizes-visitor.prizes-visitor',
      'oneToMany',
      'api::prizes-visitor.prizes-visitor'
    >;
    locale: Attribute.String;
  };
}

export interface ApiQualificationQualification extends Schema.CollectionType {
  collectionName: 'qualifications';
  info: {
    singularName: 'qualification';
    pluralName: 'qualifications';
    displayName: 'Qualification';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    g_zindividual_registrations: Attribute.Relation<
      'api::qualification.qualification',
      'oneToMany',
      'api::g-zindividual-registration.g-zindividual-registration'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::qualification.qualification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::qualification.qualification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::qualification.qualification',
      'oneToMany',
      'api::qualification.qualification'
    >;
    locale: Attribute.String;
  };
}

export interface ApiRequestedAreaRequestedArea extends Schema.CollectionType {
  collectionName: 'requested_areas';
  info: {
    singularName: 'requested-area';
    pluralName: 'requested-areas';
    displayName: 'RequestedArea';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    b_zexhibitor_registrations: Attribute.Relation<
      'api::requested-area.requested-area',
      'oneToMany',
      'api::b-zexhibitor-registration.b-zexhibitor-registration'
    >;
    g_zexhibitor_registrations: Attribute.Relation<
      'api::requested-area.requested-area',
      'oneToMany',
      'api::g-zexhibitor-registration.g-zexhibitor-registration'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::requested-area.requested-area',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::requested-area.requested-area',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::requested-area.requested-area',
      'oneToMany',
      'api::requested-area.requested-area'
    >;
    locale: Attribute.String;
  };
}

export interface ApiResidenceResidence extends Schema.CollectionType {
  collectionName: 'residences';
  info: {
    singularName: 'residence';
    pluralName: 'residences';
    displayName: 'Residence';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    g_zindividual_registrations: Attribute.Relation<
      'api::residence.residence',
      'oneToMany',
      'api::g-zindividual-registration.g-zindividual-registration'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::residence.residence',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::residence.residence',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::residence.residence',
      'oneToMany',
      'api::residence.residence'
    >;
    locale: Attribute.String;
  };
}

export interface ApiSectorFieldSectorField extends Schema.CollectionType {
  collectionName: 'sector_fields';
  info: {
    singularName: 'sector-field';
    pluralName: 'sector-fields';
    displayName: 'SectorField';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    g_zentity_registrations: Attribute.Relation<
      'api::sector-field.sector-field',
      'oneToMany',
      'api::g-zentity-registration.g-zentity-registration'
    >;
    g_zexhibitor_registrations: Attribute.Relation<
      'api::sector-field.sector-field',
      'oneToMany',
      'api::g-zexhibitor-registration.g-zexhibitor-registration'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sector-field.sector-field',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sector-field.sector-field',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::sector-field.sector-field',
      'oneToMany',
      'api::sector-field.sector-field'
    >;
    locale: Attribute.String;
  };
}

export interface ApiTitleTitle extends Schema.CollectionType {
  collectionName: 'titles';
  info: {
    singularName: 'title';
    pluralName: 'titles';
    displayName: 'Title';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    g_zindividual_registrations: Attribute.Relation<
      'api::title.title',
      'oneToMany',
      'api::g-zindividual-registration.g-zindividual-registration'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::title.title',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::title.title',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::title.title',
      'oneToMany',
      'api::title.title'
    >;
    locale: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::comments.comment': PluginCommentsComment;
      'plugin::comments.comment-report': PluginCommentsCommentReport;
      'api::b-zexhibitor-registration.b-zexhibitor-registration': ApiBZexhibitorRegistrationBZexhibitorRegistration;
      'api::entity-classification.entity-classification': ApiEntityClassificationEntityClassification;
      'api::g-zentity-registration.g-zentity-registration': ApiGZentityRegistrationGZentityRegistration;
      'api::g-zexhibitor-registration.g-zexhibitor-registration': ApiGZexhibitorRegistrationGZexhibitorRegistration;
      'api::g-zindividual-registration.g-zindividual-registration': ApiGZindividualRegistrationGZindividualRegistration;
      'api::level-representation.level-representation': ApiLevelRepresentationLevelRepresentation;
      'api::lkp-answer.lkp-answer': ApiLkpAnswerLkpAnswer;
      'api::many-employee.many-employee': ApiManyEmployeeManyEmployee;
      'api::nationality.nationality': ApiNationalityNationality;
      'api::organization-category.organization-category': ApiOrganizationCategoryOrganizationCategory;
      'api::partnership-agreement.partnership-agreement': ApiPartnershipAgreementPartnershipAgreement;
      'api::planningvisitors-space.planningvisitors-space': ApiPlanningvisitorsSpacePlanningvisitorsSpace;
      'api::prizes-visitor.prizes-visitor': ApiPrizesVisitorPrizesVisitor;
      'api::qualification.qualification': ApiQualificationQualification;
      'api::requested-area.requested-area': ApiRequestedAreaRequestedArea;
      'api::residence.residence': ApiResidenceResidence;
      'api::sector-field.sector-field': ApiSectorFieldSectorField;
      'api::title.title': ApiTitleTitle;
    }
  }
}
