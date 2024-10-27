"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from '@/lib/utils';
import { User } from "@supabase/supabase-js";
import ProjectForm from "./forms/ProjectForm"
import ContractorForm from "./forms/ContractorForm"
import InspectionForm from "./forms/InspectionForm"
import ControlForm from "./forms/ControlForm"
import CostItemForm from "./forms/CostItemForm";
import TimeExtensionForm from "./forms/TimeExtensionForm";
import CostIncreaseForm from "./forms/CostIncreaseForm";
import ProjectNoteForm from "./forms/ProjectNoteForm";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-14 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export function TabsDemo({ user }: { user: User | null }) {
  return (
    <Tabs defaultValue="project" className="w-full">
      <TabsList className="grid w-full grid-cols-8">
        <TabsTrigger value="project">Projeler</TabsTrigger>
        <TabsTrigger value="contractor">Yüklenici Bilgileri</TabsTrigger>
        <TabsTrigger value="inspection">Denetim Bilgileri</TabsTrigger>
        <TabsTrigger value="control">Kontrol</TabsTrigger>
        <TabsTrigger value="price">Keşif Artışı</TabsTrigger>
        <TabsTrigger value="time">Süre Uzatımları</TabsTrigger>
        <TabsTrigger value="cost">Maliyet Kalemleri</TabsTrigger>
        <TabsTrigger value="note">Proje Notları</TabsTrigger>
      </TabsList>

      <TabsContent value="project">
        <ProjectForm user={user} />
      </TabsContent>

      <TabsContent value="contractor">
        <ContractorForm user={user} />
      </TabsContent>

      <TabsContent value="inspection">
        <InspectionForm user={user} />
      </TabsContent>

      <TabsContent value="control">
        <ControlForm user={user} />
      </TabsContent>

      <TabsContent value="price">
        <CostIncreaseForm user={user} />
      </TabsContent>

      <TabsContent value="time">
        <TimeExtensionForm user={user} />
      </TabsContent>

      <TabsContent value="cost">
        <CostItemForm user={user} />
      </TabsContent>

      <TabsContent value="note">
        <ProjectNoteForm user={user} />
      </TabsContent>
    </Tabs>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
