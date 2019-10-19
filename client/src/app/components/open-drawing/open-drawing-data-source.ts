// import { DataSource } from '@angular/cdk/table';
// import { Drawing } from '../../../../../common/communication/drawing';
// import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

// export class OpenDrawingDataSource extends MatTableDataSource<Drawing> {
//     _renderChangesSubscription: import("rxjs").Subscription;    filteredData: Drawing[];
//     data: Drawing[];
//     filter: string;
//     sort: MatSort | null;
//     paginator: MatPaginator | null;
//     sortingDataAccessor: (data: Drawing, sortHeaderId: string) => string | number;
//     sortData: (data: Drawing[], sort: import("@angular/material").MatSort) => Drawing[];
//     filterPredicate: (data: Drawing, filter: string) => boolean;
//     _updateChangeSubscription(): void {
//         throw new Error("Method not implemented.");
//     }
//     _filterData(data: Drawing[]): Drawing[] {
//         throw new Error("Method not implemented.");
//     }
//     _orderData(data: Drawing[]): Drawing[] {
//         throw new Error("Method not implemented.");
//     }
//     _pageData(data: Drawing[]): Drawing[] {
//         throw new Error("Method not implemented.");
//     }
//     _updatePaginator(filteredDataLength: number): void {
//         throw new Error("Method not implemented.");
//     }
//     connect(): import("rxjs").BehaviorSubject<Drawing[]> {
//         throw new Error("Method not implemented.");
//     }
//     disconnect(): void {
//         throw new Error("Method not implemented.");
//     }


// }