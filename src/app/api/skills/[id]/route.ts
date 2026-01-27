import { NextRequest, NextResponse } from "next/server";
import { getSkillById, deleteSkill } from "@/lib/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const skill = await getSkillById(id);

    if (!skill) {
      return NextResponse.json(
        { error: "Skill not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(skill);
  } catch (error) {
    console.error(`Error fetching skill ${id} from D1:`, error);
    return NextResponse.json(
      { error: "Failed to fetch skill" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Check Authorization token
    const context = getCloudflareContext();
    const env = context.env as Record<string, any>;
    const apiToken = env.API_TOKEN;
    const authHeader = request.headers.get("Authorization");

    if (!apiToken || authHeader !== `Bearer ${apiToken}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const success = await deleteSkill(id);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to delete skill" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting skill ${id} from D1:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
