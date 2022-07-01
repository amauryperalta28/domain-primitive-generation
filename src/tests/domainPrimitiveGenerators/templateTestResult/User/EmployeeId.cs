using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents User's EmployeeId
/// </summary>
public sealed class EmployeeId : AbstractGuidBasedIdPrimitive
{
	private EmployeeId(Guid rawId) : base(rawId)
	{
	}

	/// <summary>
	/// Shortcut for constructor <see cref="EmployeeId"/>.
	/// <param name="rawEmployeeId">Represents a employeeId.</param>
	/// <returns>An instance of <see cref="EmployeeId"/></returns>
	/// </summary>
	public static readonly EmployeeId From(Guid rawEmployeeId) => new(rawEmployeeId);

	/// <summary>
	/// Shortcut for constructor <see cref="EmployeeId"/>.
	/// <returns>An instance of <see cref="EmployeeId"/></returns>
	/// </summary>
	public static readonly EmployeeId Generate() => new(Guid.NewGuid());
}
