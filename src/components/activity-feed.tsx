
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertTriangle, Calendar } from "lucide-react";

interface Activity {
  id: string;
  type: "report" | "alert" | "update";
  title: string;
  location: string;
  date: string;
  status: "pending" | "investigating" | "resolved";
}

const activities: Activity[] = [
  {
    id: "1",
    type: "report",
    title: "New illegal mining site reported",
    location: "Obuasi, Ashanti Region",
    date: "2024-04-22",
    status: "pending",
  },
  {
    id: "2",
    type: "alert",
    title: "Satellite detected land disturbance",
    location: "Tarkwa, Western Region",
    date: "2024-04-21",
    status: "investigating",
  },
  {
    id: "3",
    type: "update",
    title: "Enforcement team dispatched",
    location: "Akyem, Eastern Region",
    date: "2024-04-20",
    status: "investigating",
  },
  {
    id: "4",
    type: "report",
    title: "Water pollution reported in river",
    location: "Ankobra River, Western Region",
    date: "2024-04-19",
    status: "resolved",
  },
];

const ActivityFeed: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
          >
            <div
              className={`p-2 rounded-full ${
                activity.type === "report"
                  ? "bg-galamsey-gold-light/20 text-galamsey-gold-dark"
                  : activity.type === "alert"
                  ? "bg-galamsey-red-light/20 text-galamsey-red-dark"
                  : "bg-galamsey-blue-light/20 text-galamsey-blue-dark"
              }`}
            >
              {activity.type === "report" ? (
                <MapPin className="h-4 w-4" />
              ) : activity.type === "alert" ? (
                <AlertTriangle className="h-4 w-4" />
              ) : (
                <Calendar className="h-4 w-4" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">{activity.title}</h4>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    activity.status === "pending"
                      ? "border-galamsey-gold-DEFAULT text-galamsey-gold-dark"
                      : activity.status === "investigating"
                      ? "border-galamsey-blue-DEFAULT text-galamsey-blue-dark"
                      : "border-galamsey-green-DEFAULT text-galamsey-green-dark"
                  }`}
                >
                  {activity.status}
                </Badge>
              </div>
              <div className="flex items-center mt-1">
                <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
                <span className="text-xs text-muted-foreground">
                  {activity.location}
                </span>
              </div>
              <div className="flex items-center mt-0.5">
                <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
                <span className="text-xs text-muted-foreground">
                  {activity.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
