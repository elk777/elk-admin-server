/*
 * @Author: elk
 * @Date: 2025-05-08 14:36:31
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-19 16:14:25
 * @FilePath: \elk-admin-server\src\utils\permission.util.ts
 * @Description: 权限相关工具类
 */

import { ListMenuDto } from '@/module/system/menu/dto/list-menu.dto';

import { PermissionContant } from '@/constants/permission.util.constant';
/*  */
export interface IRouterRow {
  id: number;
  title: string;
  name: string;
  path: string;
  link: string;
  icon: string;
  redirect?: string;
  component?: string;
  affix?: boolean;
  isLink?: string;
  noCache?: boolean | number;
  children?: IRouterRow[];
}

/**
 * 区分路由类型
 * @param routes
 * @returns IRouterRow[]
 */
export function filterRoutes(route: ListMenuDto, isRoot: boolean): IRouterRow {
  // 目录
  if (isRoot) {
    return {
      id: route.menuId,
      title: route.menuName,
      name: route.path,
      path: route.path,
      link: null,
      icon: route.icon,
      redirect: 'noRedirect',
    };
  } else {
    return {
      id: route.menuId,
      title: route.menuName,
      name: route.path,
      path: route.path,
      icon: route.icon,
      link: route.component,
      isLink: !Number(route.isFrame) && route.path,
      affix: false,
      noCache: route.isCache,
    };
  }
}

/**
 * 改造路由结构
 * @param routes parentRoute
 * @returns IRouterRow[]
 *  */
export function transformRoutes(
  routes: ListMenuDto[],
  parentRoute?: ListMenuDto,
): IRouterRow[] {
  const routerList: IRouterRow[] = [];

  let rootRouter: IRouterRow;

  routes.forEach((route) => {
    // 如果禁用或者隐藏直接跳过
    if (Number(route.status) || Number(route.visible)) {
      return;
    }
    // 只处理顶层目录和菜单
    if (!parentRoute && route.parentId !== 0) {
      return;
    }
    // 目录
    if (!parentRoute && route.menuType === PermissionContant.CATALOGUE) {
      const childenRoutes = transformRoutes(routes, route);
      rootRouter = filterRoutes(route, true);
      if (childenRoutes && childenRoutes.length > 0) {
        rootRouter.children = childenRoutes;
      }
      //菜单
    } else if (!parentRoute && route.menuType === PermissionContant.MENU) {
      rootRouter = filterRoutes(route, false);
    } else if (parentRoute && route.parentId === parentRoute.menuId) {
      // 涉及到多层菜单和目录结构
      if (route.menuType === PermissionContant.CATALOGUE) {
        const childenRoutes = transformRoutes(routes, route);
        rootRouter = filterRoutes(route, true);
        if (childenRoutes && childenRoutes.length > 0) {
          rootRouter.children = childenRoutes;
        }
      } else {
        rootRouter = filterRoutes(route, false);
      }
    } else {
      rootRouter = null;
    }
    if (rootRouter) {
      routerList.push(rootRouter);
    }
  });
  return routerList;
}

/**
 * 获取路由列表
 * @param routes parentRoute
 * @returns IRouterRow[]
 */
export function getRoutes(routes: ListMenuDto[]): IRouterRow[] {
  return transformRoutes(routes);
}
