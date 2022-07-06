using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents CitizenWithOneRequiredProperty's Id
/// </summary>
public sealed class Id : AbstractGuidBasedIdPrimitive
{
	private Id(Guid rawId) : base(rawId)
	{
	}

	/// <summary>
	/// Shortcut for constructor <see cref="Id"/>.
	/// <param name="rawId">Represents a id.</param>
	/// <returns>An instance of <see cref="Id"/></returns>
	/// </summary>
	public static Id From(Guid rawId) => new(rawId);

	/// <summary>
	/// Shortcut for constructor <see cref="Id"/>.
	/// <returns>An instance of <see cref="Id"/></returns>
	/// </summary>
	public static Id Generate() => new(Guid.NewGuid());
}
