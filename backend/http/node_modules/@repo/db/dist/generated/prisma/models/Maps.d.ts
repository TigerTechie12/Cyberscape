import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Maps
 *
 */
export type MapsModel = runtime.Types.Result.DefaultSelection<Prisma.$MapsPayload>;
export type AggregateMaps = {
    _count: MapsCountAggregateOutputType | null;
    _avg: MapsAvgAggregateOutputType | null;
    _sum: MapsSumAggregateOutputType | null;
    _min: MapsMinAggregateOutputType | null;
    _max: MapsMaxAggregateOutputType | null;
};
export type MapsAvgAggregateOutputType = {
    width: number | null;
    height: number | null;
};
export type MapsSumAggregateOutputType = {
    width: number | null;
    height: number | null;
};
export type MapsMinAggregateOutputType = {
    id: string | null;
    width: number | null;
    height: number | null;
    name: string | null;
};
export type MapsMaxAggregateOutputType = {
    id: string | null;
    width: number | null;
    height: number | null;
    name: string | null;
};
export type MapsCountAggregateOutputType = {
    id: number;
    width: number;
    height: number;
    name: number;
    _all: number;
};
export type MapsAvgAggregateInputType = {
    width?: true;
    height?: true;
};
export type MapsSumAggregateInputType = {
    width?: true;
    height?: true;
};
export type MapsMinAggregateInputType = {
    id?: true;
    width?: true;
    height?: true;
    name?: true;
};
export type MapsMaxAggregateInputType = {
    id?: true;
    width?: true;
    height?: true;
    name?: true;
};
export type MapsCountAggregateInputType = {
    id?: true;
    width?: true;
    height?: true;
    name?: true;
    _all?: true;
};
export type MapsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Maps to aggregate.
     */
    where?: Prisma.MapsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Maps to fetch.
     */
    orderBy?: Prisma.MapsOrderByWithRelationInput | Prisma.MapsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MapsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Maps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Maps
    **/
    _count?: true | MapsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MapsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MapsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MapsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MapsMaxAggregateInputType;
};
export type GetMapsAggregateType<T extends MapsAggregateArgs> = {
    [P in keyof T & keyof AggregateMaps]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaps[P]> : Prisma.GetScalarType<T[P], AggregateMaps[P]>;
};
export type MapsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MapsWhereInput;
    orderBy?: Prisma.MapsOrderByWithAggregationInput | Prisma.MapsOrderByWithAggregationInput[];
    by: Prisma.MapsScalarFieldEnum[] | Prisma.MapsScalarFieldEnum;
    having?: Prisma.MapsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MapsCountAggregateInputType | true;
    _avg?: MapsAvgAggregateInputType;
    _sum?: MapsSumAggregateInputType;
    _min?: MapsMinAggregateInputType;
    _max?: MapsMaxAggregateInputType;
};
export type MapsGroupByOutputType = {
    id: string;
    width: number;
    height: number;
    name: string;
    _count: MapsCountAggregateOutputType | null;
    _avg: MapsAvgAggregateOutputType | null;
    _sum: MapsSumAggregateOutputType | null;
    _min: MapsMinAggregateOutputType | null;
    _max: MapsMaxAggregateOutputType | null;
};
type GetMapsGroupByPayload<T extends MapsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MapsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MapsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MapsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MapsGroupByOutputType[P]>;
}>>;
export type MapsWhereInput = {
    AND?: Prisma.MapsWhereInput | Prisma.MapsWhereInput[];
    OR?: Prisma.MapsWhereInput[];
    NOT?: Prisma.MapsWhereInput | Prisma.MapsWhereInput[];
    id?: Prisma.StringFilter<"Maps"> | string;
    width?: Prisma.IntFilter<"Maps"> | number;
    height?: Prisma.IntFilter<"Maps"> | number;
    name?: Prisma.StringFilter<"Maps"> | string;
    mapElements?: Prisma.MapElementsListRelationFilter;
};
export type MapsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    mapElements?: Prisma.mapElementsOrderByRelationAggregateInput;
};
export type MapsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MapsWhereInput | Prisma.MapsWhereInput[];
    OR?: Prisma.MapsWhereInput[];
    NOT?: Prisma.MapsWhereInput | Prisma.MapsWhereInput[];
    width?: Prisma.IntFilter<"Maps"> | number;
    height?: Prisma.IntFilter<"Maps"> | number;
    name?: Prisma.StringFilter<"Maps"> | string;
    mapElements?: Prisma.MapElementsListRelationFilter;
}, "id" | "id">;
export type MapsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    _count?: Prisma.MapsCountOrderByAggregateInput;
    _avg?: Prisma.MapsAvgOrderByAggregateInput;
    _max?: Prisma.MapsMaxOrderByAggregateInput;
    _min?: Prisma.MapsMinOrderByAggregateInput;
    _sum?: Prisma.MapsSumOrderByAggregateInput;
};
export type MapsScalarWhereWithAggregatesInput = {
    AND?: Prisma.MapsScalarWhereWithAggregatesInput | Prisma.MapsScalarWhereWithAggregatesInput[];
    OR?: Prisma.MapsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MapsScalarWhereWithAggregatesInput | Prisma.MapsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Maps"> | string;
    width?: Prisma.IntWithAggregatesFilter<"Maps"> | number;
    height?: Prisma.IntWithAggregatesFilter<"Maps"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Maps"> | string;
};
export type MapsCreateInput = {
    id?: string;
    width: number;
    height: number;
    name: string;
    mapElements?: Prisma.mapElementsCreateNestedManyWithoutMapInput;
};
export type MapsUncheckedCreateInput = {
    id?: string;
    width: number;
    height: number;
    name: string;
    mapElements?: Prisma.mapElementsUncheckedCreateNestedManyWithoutMapInput;
};
export type MapsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    width?: Prisma.IntFieldUpdateOperationsInput | number;
    height?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mapElements?: Prisma.mapElementsUpdateManyWithoutMapNestedInput;
};
export type MapsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    width?: Prisma.IntFieldUpdateOperationsInput | number;
    height?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mapElements?: Prisma.mapElementsUncheckedUpdateManyWithoutMapNestedInput;
};
export type MapsCreateManyInput = {
    id?: string;
    width: number;
    height: number;
    name: string;
};
export type MapsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    width?: Prisma.IntFieldUpdateOperationsInput | number;
    height?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MapsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    width?: Prisma.IntFieldUpdateOperationsInput | number;
    height?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MapsScalarRelationFilter = {
    is?: Prisma.MapsWhereInput;
    isNot?: Prisma.MapsWhereInput;
};
export type MapsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type MapsAvgOrderByAggregateInput = {
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
};
export type MapsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type MapsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type MapsSumOrderByAggregateInput = {
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
};
export type MapsCreateNestedOneWithoutMapElementsInput = {
    create?: Prisma.XOR<Prisma.MapsCreateWithoutMapElementsInput, Prisma.MapsUncheckedCreateWithoutMapElementsInput>;
    connectOrCreate?: Prisma.MapsCreateOrConnectWithoutMapElementsInput;
    connect?: Prisma.MapsWhereUniqueInput;
};
export type MapsUpdateOneRequiredWithoutMapElementsNestedInput = {
    create?: Prisma.XOR<Prisma.MapsCreateWithoutMapElementsInput, Prisma.MapsUncheckedCreateWithoutMapElementsInput>;
    connectOrCreate?: Prisma.MapsCreateOrConnectWithoutMapElementsInput;
    upsert?: Prisma.MapsUpsertWithoutMapElementsInput;
    connect?: Prisma.MapsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MapsUpdateToOneWithWhereWithoutMapElementsInput, Prisma.MapsUpdateWithoutMapElementsInput>, Prisma.MapsUncheckedUpdateWithoutMapElementsInput>;
};
export type MapsCreateWithoutMapElementsInput = {
    id?: string;
    width: number;
    height: number;
    name: string;
};
export type MapsUncheckedCreateWithoutMapElementsInput = {
    id?: string;
    width: number;
    height: number;
    name: string;
};
export type MapsCreateOrConnectWithoutMapElementsInput = {
    where: Prisma.MapsWhereUniqueInput;
    create: Prisma.XOR<Prisma.MapsCreateWithoutMapElementsInput, Prisma.MapsUncheckedCreateWithoutMapElementsInput>;
};
export type MapsUpsertWithoutMapElementsInput = {
    update: Prisma.XOR<Prisma.MapsUpdateWithoutMapElementsInput, Prisma.MapsUncheckedUpdateWithoutMapElementsInput>;
    create: Prisma.XOR<Prisma.MapsCreateWithoutMapElementsInput, Prisma.MapsUncheckedCreateWithoutMapElementsInput>;
    where?: Prisma.MapsWhereInput;
};
export type MapsUpdateToOneWithWhereWithoutMapElementsInput = {
    where?: Prisma.MapsWhereInput;
    data: Prisma.XOR<Prisma.MapsUpdateWithoutMapElementsInput, Prisma.MapsUncheckedUpdateWithoutMapElementsInput>;
};
export type MapsUpdateWithoutMapElementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    width?: Prisma.IntFieldUpdateOperationsInput | number;
    height?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MapsUncheckedUpdateWithoutMapElementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    width?: Prisma.IntFieldUpdateOperationsInput | number;
    height?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
/**
 * Count Type MapsCountOutputType
 */
export type MapsCountOutputType = {
    mapElements: number;
};
export type MapsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    mapElements?: boolean | MapsCountOutputTypeCountMapElementsArgs;
};
/**
 * MapsCountOutputType without action
 */
export type MapsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapsCountOutputType
     */
    select?: Prisma.MapsCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * MapsCountOutputType without action
 */
export type MapsCountOutputTypeCountMapElementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.mapElementsWhereInput;
};
export type MapsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    width?: boolean;
    height?: boolean;
    name?: boolean;
    mapElements?: boolean | Prisma.Maps$mapElementsArgs<ExtArgs>;
    _count?: boolean | Prisma.MapsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["maps"]>;
export type MapsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    width?: boolean;
    height?: boolean;
    name?: boolean;
}, ExtArgs["result"]["maps"]>;
export type MapsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    width?: boolean;
    height?: boolean;
    name?: boolean;
}, ExtArgs["result"]["maps"]>;
export type MapsSelectScalar = {
    id?: boolean;
    width?: boolean;
    height?: boolean;
    name?: boolean;
};
export type MapsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "width" | "height" | "name", ExtArgs["result"]["maps"]>;
export type MapsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    mapElements?: boolean | Prisma.Maps$mapElementsArgs<ExtArgs>;
    _count?: boolean | Prisma.MapsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MapsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type MapsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $MapsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Maps";
    objects: {
        mapElements: Prisma.$mapElementsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        width: number;
        height: number;
        name: string;
    }, ExtArgs["result"]["maps"]>;
    composites: {};
};
export type MapsGetPayload<S extends boolean | null | undefined | MapsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MapsPayload, S>;
export type MapsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MapsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MapsCountAggregateInputType | true;
};
export interface MapsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Maps'];
        meta: {
            name: 'Maps';
        };
    };
    /**
     * Find zero or one Maps that matches the filter.
     * @param {MapsFindUniqueArgs} args - Arguments to find a Maps
     * @example
     * // Get one Maps
     * const maps = await prisma.maps.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MapsFindUniqueArgs>(args: Prisma.SelectSubset<T, MapsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MapsClient<runtime.Types.Result.GetResult<Prisma.$MapsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Maps that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MapsFindUniqueOrThrowArgs} args - Arguments to find a Maps
     * @example
     * // Get one Maps
     * const maps = await prisma.maps.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MapsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MapsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MapsClient<runtime.Types.Result.GetResult<Prisma.$MapsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Maps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapsFindFirstArgs} args - Arguments to find a Maps
     * @example
     * // Get one Maps
     * const maps = await prisma.maps.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MapsFindFirstArgs>(args?: Prisma.SelectSubset<T, MapsFindFirstArgs<ExtArgs>>): Prisma.Prisma__MapsClient<runtime.Types.Result.GetResult<Prisma.$MapsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Maps that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapsFindFirstOrThrowArgs} args - Arguments to find a Maps
     * @example
     * // Get one Maps
     * const maps = await prisma.maps.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MapsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MapsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MapsClient<runtime.Types.Result.GetResult<Prisma.$MapsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Maps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Maps
     * const maps = await prisma.maps.findMany()
     *
     * // Get first 10 Maps
     * const maps = await prisma.maps.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const mapsWithIdOnly = await prisma.maps.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MapsFindManyArgs>(args?: Prisma.SelectSubset<T, MapsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MapsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Maps.
     * @param {MapsCreateArgs} args - Arguments to create a Maps.
     * @example
     * // Create one Maps
     * const Maps = await prisma.maps.create({
     *   data: {
     *     // ... data to create a Maps
     *   }
     * })
     *
     */
    create<T extends MapsCreateArgs>(args: Prisma.SelectSubset<T, MapsCreateArgs<ExtArgs>>): Prisma.Prisma__MapsClient<runtime.Types.Result.GetResult<Prisma.$MapsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Maps.
     * @param {MapsCreateManyArgs} args - Arguments to create many Maps.
     * @example
     * // Create many Maps
     * const maps = await prisma.maps.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MapsCreateManyArgs>(args?: Prisma.SelectSubset<T, MapsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Maps and returns the data saved in the database.
     * @param {MapsCreateManyAndReturnArgs} args - Arguments to create many Maps.
     * @example
     * // Create many Maps
     * const maps = await prisma.maps.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Maps and only return the `id`
     * const mapsWithIdOnly = await prisma.maps.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MapsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MapsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MapsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Maps.
     * @param {MapsDeleteArgs} args - Arguments to delete one Maps.
     * @example
     * // Delete one Maps
     * const Maps = await prisma.maps.delete({
     *   where: {
     *     // ... filter to delete one Maps
     *   }
     * })
     *
     */
    delete<T extends MapsDeleteArgs>(args: Prisma.SelectSubset<T, MapsDeleteArgs<ExtArgs>>): Prisma.Prisma__MapsClient<runtime.Types.Result.GetResult<Prisma.$MapsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Maps.
     * @param {MapsUpdateArgs} args - Arguments to update one Maps.
     * @example
     * // Update one Maps
     * const maps = await prisma.maps.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MapsUpdateArgs>(args: Prisma.SelectSubset<T, MapsUpdateArgs<ExtArgs>>): Prisma.Prisma__MapsClient<runtime.Types.Result.GetResult<Prisma.$MapsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Maps.
     * @param {MapsDeleteManyArgs} args - Arguments to filter Maps to delete.
     * @example
     * // Delete a few Maps
     * const { count } = await prisma.maps.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MapsDeleteManyArgs>(args?: Prisma.SelectSubset<T, MapsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Maps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Maps
     * const maps = await prisma.maps.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MapsUpdateManyArgs>(args: Prisma.SelectSubset<T, MapsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Maps and returns the data updated in the database.
     * @param {MapsUpdateManyAndReturnArgs} args - Arguments to update many Maps.
     * @example
     * // Update many Maps
     * const maps = await prisma.maps.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Maps and only return the `id`
     * const mapsWithIdOnly = await prisma.maps.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends MapsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MapsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MapsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Maps.
     * @param {MapsUpsertArgs} args - Arguments to update or create a Maps.
     * @example
     * // Update or create a Maps
     * const maps = await prisma.maps.upsert({
     *   create: {
     *     // ... data to create a Maps
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Maps we want to update
     *   }
     * })
     */
    upsert<T extends MapsUpsertArgs>(args: Prisma.SelectSubset<T, MapsUpsertArgs<ExtArgs>>): Prisma.Prisma__MapsClient<runtime.Types.Result.GetResult<Prisma.$MapsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Maps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapsCountArgs} args - Arguments to filter Maps to count.
     * @example
     * // Count the number of Maps
     * const count = await prisma.maps.count({
     *   where: {
     *     // ... the filter for the Maps we want to count
     *   }
     * })
    **/
    count<T extends MapsCountArgs>(args?: Prisma.Subset<T, MapsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MapsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Maps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MapsAggregateArgs>(args: Prisma.Subset<T, MapsAggregateArgs>): Prisma.PrismaPromise<GetMapsAggregateType<T>>;
    /**
     * Group by Maps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends MapsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MapsGroupByArgs['orderBy'];
    } : {
        orderBy?: MapsGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MapsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMapsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Maps model
     */
    readonly fields: MapsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Maps.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MapsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    mapElements<T extends Prisma.Maps$mapElementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Maps$mapElementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$mapElementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Maps model
 */
export interface MapsFieldRefs {
    readonly id: Prisma.FieldRef<"Maps", 'String'>;
    readonly width: Prisma.FieldRef<"Maps", 'Int'>;
    readonly height: Prisma.FieldRef<"Maps", 'Int'>;
    readonly name: Prisma.FieldRef<"Maps", 'String'>;
}
/**
 * Maps findUnique
 */
export type MapsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Maps
     */
    select?: Prisma.MapsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Maps
     */
    omit?: Prisma.MapsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MapsInclude<ExtArgs> | null;
    /**
     * Filter, which Maps to fetch.
     */
    where: Prisma.MapsWhereUniqueInput;
};
/**
 * Maps findUniqueOrThrow
 */
export type MapsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Maps
     */
    select?: Prisma.MapsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Maps
     */
    omit?: Prisma.MapsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MapsInclude<ExtArgs> | null;
    /**
     * Filter, which Maps to fetch.
     */
    where: Prisma.MapsWhereUniqueInput;
};
/**
 * Maps findFirst
 */
export type MapsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Maps
     */
    select?: Prisma.MapsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Maps
     */
    omit?: Prisma.MapsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MapsInclude<ExtArgs> | null;
    /**
     * Filter, which Maps to fetch.
     */
    where?: Prisma.MapsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Maps to fetch.
     */
    orderBy?: Prisma.MapsOrderByWithRelationInput | Prisma.MapsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Maps.
     */
    cursor?: Prisma.MapsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Maps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Maps.
     */
    distinct?: Prisma.MapsScalarFieldEnum | Prisma.MapsScalarFieldEnum[];
};
/**
 * Maps findFirstOrThrow
 */
export type MapsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Maps
     */
    select?: Prisma.MapsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Maps
     */
    omit?: Prisma.MapsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MapsInclude<ExtArgs> | null;
    /**
     * Filter, which Maps to fetch.
     */
    where?: Prisma.MapsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Maps to fetch.
     */
    orderBy?: Prisma.MapsOrderByWithRelationInput | Prisma.MapsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Maps.
     */
    cursor?: Prisma.MapsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Maps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Maps.
     */
    distinct?: Prisma.MapsScalarFieldEnum | Prisma.MapsScalarFieldEnum[];
};
/**
 * Maps findMany
 */
export type MapsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Maps
     */
    select?: Prisma.MapsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Maps
     */
    omit?: Prisma.MapsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MapsInclude<ExtArgs> | null;
    /**
     * Filter, which Maps to fetch.
     */
    where?: Prisma.MapsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Maps to fetch.
     */
    orderBy?: Prisma.MapsOrderByWithRelationInput | Prisma.MapsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Maps.
     */
    cursor?: Prisma.MapsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Maps.
     */
    skip?: number;
    distinct?: Prisma.MapsScalarFieldEnum | Prisma.MapsScalarFieldEnum[];
};
/**
 * Maps create
 */
export type MapsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Maps
     */
    select?: Prisma.MapsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Maps
     */
    omit?: Prisma.MapsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MapsInclude<ExtArgs> | null;
    /**
     * The data needed to create a Maps.
     */
    data: Prisma.XOR<Prisma.MapsCreateInput, Prisma.MapsUncheckedCreateInput>;
};
/**
 * Maps createMany
 */
export type MapsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Maps.
     */
    data: Prisma.MapsCreateManyInput | Prisma.MapsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Maps createManyAndReturn
 */
export type MapsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Maps
     */
    select?: Prisma.MapsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Maps
     */
    omit?: Prisma.MapsOmit<ExtArgs> | null;
    /**
     * The data used to create many Maps.
     */
    data: Prisma.MapsCreateManyInput | Prisma.MapsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Maps update
 */
export type MapsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Maps
     */
    select?: Prisma.MapsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Maps
     */
    omit?: Prisma.MapsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MapsInclude<ExtArgs> | null;
    /**
     * The data needed to update a Maps.
     */
    data: Prisma.XOR<Prisma.MapsUpdateInput, Prisma.MapsUncheckedUpdateInput>;
    /**
     * Choose, which Maps to update.
     */
    where: Prisma.MapsWhereUniqueInput;
};
/**
 * Maps updateMany
 */
export type MapsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Maps.
     */
    data: Prisma.XOR<Prisma.MapsUpdateManyMutationInput, Prisma.MapsUncheckedUpdateManyInput>;
    /**
     * Filter which Maps to update
     */
    where?: Prisma.MapsWhereInput;
    /**
     * Limit how many Maps to update.
     */
    limit?: number;
};
/**
 * Maps updateManyAndReturn
 */
export type MapsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Maps
     */
    select?: Prisma.MapsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Maps
     */
    omit?: Prisma.MapsOmit<ExtArgs> | null;
    /**
     * The data used to update Maps.
     */
    data: Prisma.XOR<Prisma.MapsUpdateManyMutationInput, Prisma.MapsUncheckedUpdateManyInput>;
    /**
     * Filter which Maps to update
     */
    where?: Prisma.MapsWhereInput;
    /**
     * Limit how many Maps to update.
     */
    limit?: number;
};
/**
 * Maps upsert
 */
export type MapsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Maps
     */
    select?: Prisma.MapsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Maps
     */
    omit?: Prisma.MapsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MapsInclude<ExtArgs> | null;
    /**
     * The filter to search for the Maps to update in case it exists.
     */
    where: Prisma.MapsWhereUniqueInput;
    /**
     * In case the Maps found by the `where` argument doesn't exist, create a new Maps with this data.
     */
    create: Prisma.XOR<Prisma.MapsCreateInput, Prisma.MapsUncheckedCreateInput>;
    /**
     * In case the Maps was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MapsUpdateInput, Prisma.MapsUncheckedUpdateInput>;
};
/**
 * Maps delete
 */
export type MapsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Maps
     */
    select?: Prisma.MapsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Maps
     */
    omit?: Prisma.MapsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MapsInclude<ExtArgs> | null;
    /**
     * Filter which Maps to delete.
     */
    where: Prisma.MapsWhereUniqueInput;
};
/**
 * Maps deleteMany
 */
export type MapsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Maps to delete
     */
    where?: Prisma.MapsWhereInput;
    /**
     * Limit how many Maps to delete.
     */
    limit?: number;
};
/**
 * Maps.mapElements
 */
export type Maps$mapElementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mapElements
     */
    select?: Prisma.mapElementsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the mapElements
     */
    omit?: Prisma.mapElementsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.mapElementsInclude<ExtArgs> | null;
    where?: Prisma.mapElementsWhereInput;
    orderBy?: Prisma.mapElementsOrderByWithRelationInput | Prisma.mapElementsOrderByWithRelationInput[];
    cursor?: Prisma.mapElementsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MapElementsScalarFieldEnum | Prisma.MapElementsScalarFieldEnum[];
};
/**
 * Maps without action
 */
export type MapsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Maps
     */
    select?: Prisma.MapsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Maps
     */
    omit?: Prisma.MapsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MapsInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Maps.d.ts.map