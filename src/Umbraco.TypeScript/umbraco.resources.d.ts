
declare module umbraco {
    export module resources {

        interface iPromise {
            then(callback: (...args: any[]) => void): void;
        }

        interface iPromiseTyped<T> {
            then(callback: T): void;
        }

        interface iUserBasic {
            id: number;
            name: string;
        }

        interface iEntityBasic {
            id: number;
            name: string;
            icon: string;
            trashed: boolean;
            key: string;
            parentId: number;
            alias: string;
            path: string;
            metaData: { [key: string]: any };
        }


        /////////////////
        //AuthResource
        /////////////////
        interface authResource {

        }


        /////////////////
        //ContentResource
        /////////////////
        interface contentResource {
            copy(args: contentResourceCopyArgs): iPromise;
            deleteById(id: number): iPromise;
            emptyRecycleBin(): iPromise;
            getById(id: number): iPromiseTyped<(iContent: iContentItemDisplay) => void>;
            getByIds(ids: number[]): iPromiseTyped<Array<iContentItemDisplay>>;
            getChildren(id: number, args: getChildrenArgs): iPromiseTyped<(contentArray: Array<iContentItemDisplay>) => void>;
            getNiceUrl(id: number): iPromiseTyped<(url: string) => void>;
            getScaffold(): iPromiseTyped<(scaffold: iContentResourceScaffold) => void>;
            getScaffold(parentId: number, contentTypeAlias: string): iPromiseTyped<(scaffold: iContentResourceScaffold) => void>;
            hasPermission(permission: string, id: number): iPromise;
            move(args: moveArgs): iPromise;
            publish(content: iContentItemSave, isNew: boolean, files?: any): iPromiseTyped<(content: iContentItemDisplay) => void>;
            publishByid(id: number): iPromiseTyped<(content: iContentItemDisplay) => void>;
            save(content: iContentItemSave, isNew: boolean, files?: any): iPromiseTyped<(content: iContentItemDisplay) => void>;
            sendToPublish(content: iContentItemSave, isNew: boolean, files?: any): iPromiseTyped<(content: iContentItemDisplay) => void>;
            sort(args: sortArgs): iPromise;
            unPublish(id: number): iPromise;
        }


        interface iContentResourceScaffold {
            name: string;
        }

        interface contentResourceCopyArgs {
            id: number;
            parentId: number;
            relateToOriginal: boolean;
        }

        interface getChildrenArgs {
            pageSize: number;
            pageNumber: number;
            filter: string;
            orderDirection: string;
            orderBy: string;
        }

        interface moveArgs {
            id: number;
            parentId: number;
        }

        interface sortArgs {
            parentId: number;
            sortIds: Array<number>;
        }

        interface iContentItemDisplay extends iListViewAwareContentItemDisplayBase<iContentPropertyDisplay> {
            publishDate?: Date;
            releaseDate?: Date;
            removeDate: Date;
            template: string;
            Urls: Array<string>;
            allowedActions: Array<string>;
        }

        interface iContentItemSave extends iContentBaseItemSave {

        }

        interface iContentItemBasic<T> extends iEntityBasic {
            updateDate: Date;
            createDate: Date;
            published: boolean;
            owner: iUserBasic;
            updater: iUserBasic;
            contentTypeAlias: string;
            sortOrder: number;
            properties: Array<T>;
        }

        interface iContentBaseItemSave extends iContentItemBasic<iContentPropertyBasic> {
            action: string;
            uploadedFiles: any;
        }

        interface iTabbedContentItem<T> extends iContentItemBasic<T> {
            tabs: Array<iTab<T>>;
            properties: Array<T>;
        }

        interface iContentItemDisplayBase<T> extends iTabbedContentItem<T>, iNotificationModel, iErrorModel {
            contentTypeName: string;
            isContainer: boolean;
            properties: Array<T>
        }

        interface iListViewAwareContentItemDisplayBase<T> extends iContentItemDisplayBase<T> {
            isChildOfListView: boolean;
            treeNodeUrl: string;
        }

        interface iContentPropertyDisplay extends iContentPropertyBasic {
            label: string;
            description: string;
            view: string;
            config: { [key: string]: any };
            hideLabel: boolean;
            validation: iPropertyTypeValidation;
        }

        interface iPropertyTypeValidation {
            mandatory: string;
            pattern: string;
        }

        interface iContentPropertyBasic {
            id: number;
            value: any;
            alias: string;
            editor: string;
        }

        interface iNotificationModel {
            notifications: Array<iNotification>;
        }

        interface iNotification {
            header: string;
            message: string;
            type: number;
        }

        interface iErrorModel {
            errors: Array<{ [key: string]: any }>;
        }

        interface iTab<T> {
            id: number;
            active: boolean;
            label: string;
            alias: string;
            properties: Array<T>
        }



        /////////////////
        //ContentTypeResource
        /////////////////  
        interface contentTypeResource {
            getAllowedTypes(contentId: number): iPromiseTyped<(contentTypeArray: Array<iContentTypeBasic>) => void>;
            getAllPropertyTypeAliases(): iPromiseTyped<(propertyTypes: Array<string>) => void>;
        }

        interface iContentTypeBasic extends iEntityBasic {
            description: string;
            thumbnail: string;
            iconIsClass: boolean;
            iconFilePath: string;
            thumbnailIsClass: boolean;
            thumbnailFilePath: string;
        }



        /////////////////
        //CurrentUserResource
        /////////////////  
        interface currentUserResource {
            changePassword(changePasswordArgs: ChangePasswordArgs): iPromiseTyped<(password?: string) => void>;
            getMembershipProviderConfig(): iPromiseTyped<(config: { [id: string]: any }) => void>;
        }

        interface ChangePasswordArgs {
            newPassword: string;
            oldPassword: string;
            reset?: boolean;
            answer?: string;
            generatedPassword?: string;
        }



        /////////////////
        //DashboardResource
        ///////////////// 
        interface dashboardResource {
            getDashboard(section: string): iPromise;
        }



        /////////////////
        //EntityResource
        /////////////////
        interface entityResource {
            getAncestors(id: number, type: string): iPromise;
            getPath(id: number, type: string): iPromise;
            getById(id: number, type: string): iPromise;
            getByQuery(query: string, nodeContextId: number, type: any): iPromise;
            getAll(type: string, postFilter?: string, postFilterParams?: string): iPromise;
            getByIds(id: number, type: string): iPromise;
            getChildren(id: number, type: any): iPromise;
            search(query: string, type: string, searchFrom?: any, canceler?: any): iPromise;
            searchAll(query: string, canceler: any): iPromise;
        }



        /////////////////
        //MediaResource
        /////////////////
        interface mediaResource {
            move(args: moveArgs): iPromise;
            sort(args: sortArgs): iPromise;
            getById(id: number): iPromiseTyped<(media: iMediaDisplay) => void>;
            deleteById(id: number): iPromise;
            getByIds(ids: Array<number>): iPromiseTyped<(media: Array<iMediaDisplay>) => void>;
            getScaffold(parentId: number, alias: string): iPromise;
            rootMedia(): iPromise;
            getChildren(parentId: number, options: getChildrenArgs): iPromiseTyped<(media: Array<iMediaDisplay>) => void>;
            save(media: iMediaSave, isNew: boolean, files: Array<any>): iPromiseTyped<(media: iMediaDisplay) => void>;
            addFolder(name: string, parentId: number): iPromiseTyped<(media: iMediaDisplay) => void>;
            emptyRecycleBin(): iPromise;
        }

        interface iMediaDisplay extends iListViewAwareContentItemDisplayBase<iContentPropertyDisplay> {

        }

        interface iMediaSave extends iContentBaseItemSave {

        }



        /////////////////
        //MemberResource
        /////////////////
        interface memberResource {
            getByKey(key: string): iPromiseTyped<(member: iMediaSave) => void>;
            deleteByKey(key: string): iPromise;
            save(member: iMemberSave, isNew: boolean, files: Array<any>): iPromiseTyped<(media: iMediaSave) => void>;
        }

        interface iMemberDisplay {
            username: string;
            email: string;
            membershipScenario: string;
            fieldConfig: { [key: string]: string };
        }

        interface iMemberSave {
            username: string;
            email: string;
            password: iChangingPasswordModel;
            memberGroups: Array<string>;
            comments: string;
            isLockedOut: boolean;
            isApproved: boolean;
        }

        interface iChangingPasswordModel {
            newPassword: string;
            oldPassword: string;
            reset?: boolean;
            answer: string;
            generatedPassword: string;
        }
    }
}