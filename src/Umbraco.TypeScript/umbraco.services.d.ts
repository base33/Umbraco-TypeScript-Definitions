/// <reference path="scripts/typings/jquery/jquery.d.ts" />

declare module umbraco {
    export module services {
        interface iGenericCallbackOptions {
            callback?: (...args: any[]) => void;
        }

        interface iPromise {
            then(callback: (...args: any[]) => void): void;
        }

        interface iPromiseTyped<T> {
            then(callback: T): void;
        }



        /////////////////
        //DialogService
        /////////////////
        interface dialogService {
            close(dialog: any, args: any);
            closeAll(args);
            contentPicker(options: iContentPickerOptions): void;
            iconPicker(options: iGenericCallbackOptions): void;
            linkPicker(options: iGenericCallbackOptions): void;
            macroPicker(options: iGenericCallbackOptions): void;
            mediaPicker(options: iGenericCallbackOptions): void;
            memberGroupPicker(options: iContentPickerOptions): void;
            memberPicker(options: iContentPickerOptions): void;
            open(options: iDialogOptions): void;
            treePicker(options: iTreePickerOptions): void;
        }

        interface iContentPickerOptions extends iGenericCallbackOptions {
            multiPicker: boolean;
        }

        interface iMediaPickerOptions extends iGenericCallbackOptions {
            onlyImages: boolean;
        }

        interface iTreePickerOptions extends iContentPickerOptions {
            section: string;
            treeAlias: string;
        }

        interface iDialogOptions {
            container?: JQuery;
            animation?: string;
            modalClass?: string;
            width?: any;
            inline?: boolean;
            iframe?: boolean;
            show?: boolean;
            template?: string;
            callback?: (...args: any[]) => void;
            closeCallback?: (...args: any[]) => void;
            element?: JQuery;
            dialogData?: any;
        }



        /////////////////
        //AssetService
        /////////////////
        interface assetService {
            load(pathArray: string[], scope: ng.IScope): iPromise;
            loadCss(path: string, scope: ng.IScope, keyValue?: { [key: string]: any }, timeout?: number): iPromise;
            loadJs(path: string, scope: ng.IScope, keyValue?: { [key: string]: any }, timeout?: number): iPromise;
        }


        /////////////////
        //NotificationsService
        /////////////////
        interface notificationsService {
            add(item: iAngularNotification): iAngularNotification;
            Error(item: iAngularNotificationBase): iAngularNotificationBase;
            getCurrent(): Array<iAngularNotificationBase>;
            remove(index: number): void;
            removeAll(): void;
            success(headline: string, message: string): iAngularNotificationBase;
            warning(headline: string, message: string): iAngularNotificationBase;
            
            /***
            * Shows an info notification
            * @return something
            ****/
            info(headline: string, message: string): iAngularNotificationBase;
            showNotification(item: iAngularNotification): void;
        }

        interface iAngularNotificationBase {
            headline: string;
            message: string;
        }

        interface iAngularNotification extends iAngularNotificationBase {
            type: string;
            url: string;
            view: string;
            actions: Array<any>;
            sticky: boolean;
            time: Date;
        }

    }
}