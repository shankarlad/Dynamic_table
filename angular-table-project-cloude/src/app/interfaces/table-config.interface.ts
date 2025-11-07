// src/app/interfaces/table-config.interface.ts
export interface TableColumn {
    key: string;
    header: string;
    sortable?: boolean;
    visible?: boolean;
    type?: 'text' | 'number' | 'date' | 'boolean' | 'action';
    width?: string;
}

export interface TableConfig {
    columns: TableColumn[];
    data: any[];
    pagination?: {
        enabled: boolean;
        pageSize: number;
        pageSizeOptions: number[];
    };
    sorting?: {
        enabled: boolean;
        defaultColumn?: string;
        defaultDirection?: 'asc' | 'desc';
    };
    searching?: {
        enabled: boolean;
        placeholder?: string;
    };
    actions?: {
        edit?: boolean;
        delete?: boolean;
        view?: boolean;
        custom?: Array<{ label: string; icon?: string; action: string }>;
    };
}