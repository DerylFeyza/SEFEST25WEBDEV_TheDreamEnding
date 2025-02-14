"use server";

import prisma from "@/lib/prisma";

export const getDashboardStats = async (ownerId: string) => {
    try {
        const totalRevenueResult = await prisma.$queryRaw<{ total: number }[]>`
            SELECT SUM(i.rent_price) as total 
            FROM "Rental" r
            JOIN "Item" i ON r.item_id = i.id
            WHERE r.status = 'COMPLETED' 
            AND i.owner_id = ${ownerId}
        `;
        
        const totalRevenue = Number(totalRevenueResult[0]?.total) || 0;

        const [totalOngoingRent, totalItems, totalOrders] = await Promise.all([
            prisma.rental.count({
                where: { 
                    status: "ONGOING", 
                    item: { owner_id: ownerId } 
                }
            }),
            prisma.item.count({ where: { owner_id: ownerId } }),
            prisma.rental.count({
                where: { item: { owner_id: ownerId } }
            })
        ]);

        const summaryRevenue = await prisma.$queryRaw<{ date: string; revenue: number }[]>`
            SELECT DATE(r.finished_date) as date, SUM(i.rent_price) as revenue
            FROM "Rental" r
            JOIN "Item" i ON r.item_id = i.id
            WHERE r.status = 'COMPLETED'
            AND i.owner_id = ${ownerId}
            GROUP BY DATE(r.finished_date)
            ORDER BY date ASC
        `;

        return {
            totalRevenue: totalRevenue.toString(),
            totalOngoingRent,
            totalItems,
            totalOrders,
            summaryRevenue
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};