import { db, auditLogs } from 'db';
import { Request, Response, NextFunction } from 'express';

export const logAudit = (action: string, resourceType: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;
    
    res.json = function (body: any) {
      // Capture the response and log it
      const userId = (req as any).user?.userId;
      const resourceId = req.params.id || body?.id || body?.assessment?.id || body?.user?.id;

      if (res.statusCode >= 200 && res.statusCode < 300) {
        db.insert(auditLogs).values({
          userId,
          action,
          resourceType,
          resourceId: resourceId?.toString(),
          details: {
            method: req.method,
            path: req.originalUrl,
            status: res.statusCode,
            ip: req.ip,
          }
        }).catch(err => console.error('Failed to log audit:', err));
      }

      return originalJson.call(this, body);
    };

    next();
  };
};
